/**
 * MVC核心路由解析框架，生成控制区，在每个控制区下自动扫描controlers,使其定义为控制器，所有的请求路径映射控制器，一个控制器映射映射多个子路由，一个路由句柄映射一个函数。
 */
var fs = require('fs');
var path = require('path');

module.exports = {
    // 设置路由目录
    setRouteDirectory: function (routeConfig) {
        this.areaDirectory = routeConfig.areaDirectory;
        this.controllerDirname = routeConfig.controllerDirname;
        this.defaultArea = routeConfig.defaultArea.toLowerCase();
        this.defautController = routeConfig.defautController.toLowerCase();
        this.defautAction = routeConfig.defautAction.toLowerCase();
        this.pathParams = {};
        this.pathFunctions = {};
        this.pathMiddlewares = {};
        return this;
    },

    bind: function (app, cb) {
        var self = this;

        // 得到所有控制区
        fs.readdir(self.areaDirectory, function (err, areas) {
            if (err) {
                if (cb) cb(err);
                return;
            }
            // 循环所有控制区
            areas.forEach(function (area) {

                fs.readdir(path.join(self.areaDirectory, "/", area, "/", self.controllerDirname), function (err, list) {
                    if (err) {
                        if (cb) cb(err);
                        return;
                    }
                    list.forEach(function (file) {
                        var fileName = path.join(self.areaDirectory, "/", area, "/", self.controllerDirname) + '/' + file;
                        if (fileName.indexOf('Controller') == -1 || !self.isFileModule(file))
                            return;
                        var controller = require(fileName);
                        var aliases = controller['aliases'] || [];
                        delete controller['aliases'];
                        aliases.push((self.translateFileNameToControllerName(file)).toLowerCase());

                        var paths = [];

                        for (var key in controller) {
                            //控制器中的功能
                            var f = controller[key];
                            var middlewareFunctions = undefined;

                            //路由中间件阵列支持
                            if (Array.isArray(f)) {
                                if (f.length == 1) {
                                    f = f[0];
                                }
                                else if (f.length > 1) {
                                    var controllerFunction = f.pop();
                                    middlewareFunctions = f;
                                    f = controllerFunction;
                                }
                                else {
                                    throw new Error('没有定义控制器功能');
                                }
                            }

                            //控制器功能中的参数
                            var params = self.translateFunctionBodyToParameterArray(f);

                            aliases.forEach(function (alias) {
                                //生成的路径（方法和url）
                                var path = self.translatePath(area, key, alias, params);
                                //这个函数是否转换为路由的有效路径
                                if (path !== false) {

                                    self.pathMiddlewares[path.method + path.path] = middlewareFunctions;
                                    var pathObj = {path: path, params: params, f: f};
                                    paths.push(pathObj);

                                    paths = self.addDefaultRoute(path, area, key, alias, params, paths, middlewareFunctions, f);
                                }
                            });
                        }
                        paths.sort(function (a, b) {
                            return b.path.path.localeCompare(a.path.path);
                        });

                        paths.forEach(function (pathObj) {
                            //将app中的路由绑定到该方法
                            self.bindFunction(app, pathObj.path, pathObj.params, pathObj.f);
                        })
                    });
                    if (cb) {
                        cb();
                    }
                });
            });
        });
    },
    bindFunction: function (app, path, params, f) {

        var self = this;

        var pathKey = path.method.toLowerCase() + path.path;

        self.pathParams[pathKey] = params;
        self.pathFunctions[pathKey] = f;

        if (self.pathMiddlewares[pathKey] && Array.isArray(self.pathMiddlewares[pathKey])) {

            app[path.method.toLowerCase()](
                path.path,
                self.pathMiddlewares[pathKey],
                function (req, res) {
                    var reqKey = req.method.toLowerCase() + req.route.path;
                    if (!self.pathParams[reqKey]) reqKey = 'get' + req.route.path;
                    var clonedParams = self.pathParams[reqKey].slice(0);
                    clonedParams = self.translateKeysArrayToValuesArray(clonedParams, req.params);
                    clonedParams.unshift(req, res);
                    self.pathFunctions[reqKey].apply(self, clonedParams);
                }
            );

        }
        else {

            app[path.method.toLowerCase()](
                path.path,
                function (req, res) {
                    var reqKey = req.method.toLowerCase() + req.route.path;
                    if (!self.pathParams[reqKey]) reqKey = 'get' + req.route.path;
                    var clonedParams = self.pathParams[reqKey].slice(0);
                    clonedParams = self.translateKeysArrayToValuesArray(clonedParams, req.params);
                    clonedParams.unshift(req, res);
                    self.pathFunctions[reqKey].apply(self, clonedParams);
                }
            );

        }

    },

    addDefaultRoute: function (path, area, key, alias, params, paths, middlewareFunctions, f) {
        var self = this;

        var defaultPath = "";
        // 设置默认路由
        if ((alias == self.defautController)) {
            if (key.toLowerCase() == "get_" + self.defautAction) {
                if (area == self.defaultArea) {
                    defaultPath = "/";
                    self.pathMiddlewares[path.method + defaultPath] = middlewareFunctions;
                    paths.push({path: {path: defaultPath, method: path.method}, params: params, f: f});
                }

                defaultPath = "/" + area;
                self.pathMiddlewares[path.method + defaultPath] = middlewareFunctions;
                paths.push({path: {path: defaultPath, method: path.method}, params: params, f: f});


                defaultPath = "/" + area + "/" + alias;
                self.pathMiddlewares[path.method + defaultPath] = middlewareFunctions;
                paths.push({path: {path: defaultPath, method: path.method}, params: params, f: f});
            }
        }
        else {
            if (key.toLowerCase() == "get_" + self.defautAction) {
                defaultPath = "/" + area + "/" + alias;

                self.pathMiddlewares[path.method + defaultPath] = middlewareFunctions;
                paths.push({path: {path: defaultPath, method: path.method}, params: params, f: f});
            }
        }

        return paths;
    },

    translateKeysArrayToValuesArray: function (keysArray, keyValueObject) {
        var valuesArray = [];
        for (var i = 0; i < keysArray.length; i++) {
            valuesArray.push(keyValueObject[keysArray[i]]);
        }
        return valuesArray;
    },

    translateFunctionBodyToParameterArray: function (f) {
        if (typeof f == 'function') {
            var params = f.toString()
                .replace(/((\/\/.*$)|(\/\*[\s\S]*?\*\/)|(\s))/mg, '')
                .match(/^function\s*[^\(]*\(\s*([^\)]*)\)/m)[1]
                .split(/,/)

            if (params.length >= 2) {
                params.splice(0, 2);
                return params;
            }
            else {
                throw new Error('定义的控制器功能参数太少');
            }
        }
        else {
            throw new Error('定义的控制器对象不是一个函数');
        }

    },

    translateFileNameToControllerName: function (fileName) {
        return fileName
            .slice(0,
                //在最后一个点之前获取所有内容
                fileName.lastIndexOf('.'))
            .replace('Controller', '');
    },

    translatePath: function (areaName, methodName, controllerName, parameters) {
        var self = this;

        //确保两个字符串都是小写字母
        controllerName = controllerName.toLowerCase();
        parameters = parameters || [];

        var parts = methodName.split('_');

        //从parts中提取方法
        var method = parts[0].toLowerCase();

        //如果此请求方法无效，则返回false
        //或如果操作名称丢失
        if (['get', 'post', 'put', 'delete', 'patch'].indexOf(method) == -1) return false;
        if (parts.length < 1) return false;

        ////从parts中删除方法
        parts.splice(0, 1);

        var path = '/' + areaName + '/';

        //将控制器名称追加到路径，如果与“home”不同
        //if (controllerName != self.defautController)
        path += controllerName;

        //附加其余部分
        parts.forEach(function (part) {
            //if (part != self.defautAction) {
            var separator = !!~parameters.indexOf(part) ? '/:' : '/';
            if (separator == '/') {
                //用连字符的小写字符串替换camelCased部分
                part = part.replace(/([A-Z])/g, '-$1').toLowerCase();
            }
            path += separator + part;
            //}
        });

        parameters.forEach(function (parameter) {
            if (!~parts.indexOf(parameter))
                path += "/:" + parameter;
        });

        return {
            path: path,
            method: method
        }
    },

    isFileModule: function (file) {
        var ext = path.extname(file);

        if (path.basename(file, ext)[0] === '.') {
            return false;
        }

        if (ext !== '' && !this.isValidExtension(ext)) {
            return false;
        }

        return true;
    },

    isValidExtension: function (ext) {
        var keys = Object.keys(require.extensions);
        return keys.indexOf(ext) !== -1;
    }
};

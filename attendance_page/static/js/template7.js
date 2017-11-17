/**
 * Template7 1.1.0
 * Mobile-first JavaScript template engine
 *
 * http://www.idangero.us/template7/
 *
 * Copyright 2015, Vladimir Kharlampidi
 * The iDangero.us
 * http://www.idangero.us/
 *
 * Licensed under MIT
 *
 * Released on: October 3, 2015
 */
window.Template7 = function () {
    "use strict";
    function e(e) {
        return "[object Array]" === Object.prototype.toString.apply(e)
    }

    function t(e) {
        return "function" == typeof e
    }

    function r(e) {
        var t, r, n, i = e.replace(/[{}#}]/g, "").split(" "), a = [];
        for (r = 0; r < i.length; r++) {
            var l = i[r];
            if (0 === r) a.push(l); else if (0 === l.indexOf('"'))if (2 === l.match(/"/g).length) a.push(l); else {
                for (t = 0, n = r + 1; n < i.length; n++)if (l += " " + i[n], i[n].indexOf('"') >= 0) {
                    t = n, a.push(l);
                    break
                }
                t && (r = t)
            } else if (l.indexOf("=") > 0) {
                var o = l.split("="), p = o[0], s = o[1];
                if (2 !== s.match(/"/g).length) {
                    for (t = 0, n = r + 1; n < i.length; n++)if (s += " " + i[n], i[n].indexOf('"') >= 0) {
                        t = n;
                        break
                    }
                    t && (r = t)
                }
                var f = [p, s.replace(/"/g, "")];
                a.push(f)
            } else a.push(l)
        }
        return a
    }

    function n(t) {
        var n, i, a = [];
        if (!t)return [];
        var l = t.split(/({{[^{^}]*}})/);
        for (n = 0; n < l.length; n++) {
            var o = l[n];
            if ("" !== o)if (o.indexOf("{{") < 0) a.push({type: "plain", content: o}); else {
                if (o.indexOf("{/") >= 0)continue;
                if (o.indexOf("{#") < 0 && o.indexOf(" ") < 0 && o.indexOf("else") < 0) {
                    a.push({type: "variable", contextName: o.replace(/[{}]/g, "")});
                    continue
                }
                var p = r(o), s = p[0], f = ">" === s, c = [], u = {};
                for (i = 1; i < p.length; i++) {
                    var h = p[i];
                    e(h) ? u[h[0]] = "false" === h[1] ? !1 : h[1] : c.push(h)
                }
                if (o.indexOf("{#") >= 0) {
                    var d, v = "", g = "", m = 0, x = !1, y = !1, O = 0;
                    for (i = n + 1; i < l.length; i++)if (l[i].indexOf("{{#") >= 0 && O++, l[i].indexOf("{{/") >= 0 && O--, l[i].indexOf("{{#" + s) >= 0) v += l[i], y && (g += l[i]), m++; else if (l[i].indexOf("{{/" + s) >= 0) {
                        if (!(m > 0)) {
                            d = i, x = !0;
                            break
                        }
                        m--, v += l[i], y && (g += l[i])
                    } else l[i].indexOf("else") >= 0 && 0 === O ? y = !0 : (y || (v += l[i]), y && (g += l[i]));
                    x && (d && (n = d), a.push({
                        type: "helper",
                        helperName: s,
                        contextName: c,
                        content: v,
                        inverseContent: g,
                        hash: u
                    }))
                } else o.indexOf(" ") > 0 && (f && (s = "_partial", c[0] && (c[0] = '"' + c[0].replace(/"|'/g, "") + '"')), a.push({
                    type: "helper",
                    helperName: s,
                    contextName: c,
                    hash: u
                }))
            }
        }
        return a
    }

    var i = function (e) {
        function t(e, t) {
            return e.content ? l(e.content, t) : function () {
                return ""
            }
        }

        function r(e, t) {
            return e.inverseContent ? l(e.inverseContent, t) : function () {
                return ""
            }
        }

        function i(e, t) {
            var r, n, i = 0;
            if (0 === e.indexOf("../")) {
                i = e.split("../").length - 1;
                var a = t.split("_")[1] - i;
                t = "ctx_" + (a >= 1 ? a : 1), n = e.split("../")[i].split(".")
            } else 0 === e.indexOf("@global") ? (t = "Template7.global", n = e.split("@global.")[1].split(".")) : 0 === e.indexOf("@root") ? (t = "root", n = e.split("@root.")[1].split(".")) : n = e.split(".");
            r = t;
            for (var l = 0; l < n.length; l++) {
                var o = n[l];
                0 === o.indexOf("@") ? l > 0 ? r += "[(data && data." + o.replace("@", "") + ")]" : r = "(data && data." + e.replace("@", "") + ")" : isFinite(o) ? r += "[" + o + "]" : 0 === o.indexOf("this") ? r = o.replace("this", t) : r += "." + o
            }
            return r
        }

        function a(e, t) {
            for (var r = [], n = 0; n < e.length; n++)0 === e[n].indexOf('"') ? r.push(e[n]) : r.push(i(e[n], t));
            return r.join(", ")
        }

        function l(e, l) {
            if (l = l || 1, e = e || o.template, "string" != typeof e)throw new Error("Template7: Template must be a string");
            var p = n(e);
            if (0 === p.length)return function () {
                return ""
            };
            var s = "ctx_" + l, f = "";
            f += 1 === l ? "(function (" + s + ", data, root) {\n" : "(function (" + s + ", data) {\n", 1 === l && (f += "function isArray(arr){return Object.prototype.toString.apply(arr) === '[object Array]';}\n", f += "function isFunction(func){return (typeof func === 'function');}\n", f += 'function c(val, ctx) {if (typeof val !== "undefined" && val !== null) {if (isFunction(val)) {return val.call(ctx);} else return val;} else return "";}\n', f += "root = root || ctx_1 || {};\n"), f += "var r = '';\n";
            var c;
            for (c = 0; c < p.length; c++) {
                var u = p[c];
                if ("plain" !== u.type) {
                    var h, d;
                    if ("variable" === u.type && (h = i(u.contextName, s), f += "r += c(" + h + ", " + s + ");"), "helper" === u.type)if (u.helperName in o.helpers) d = a(u.contextName, s), f += "r += (Template7.helpers." + u.helperName + ").call(" + s + ", " + (d && d + ", ") + "{hash:" + JSON.stringify(u.hash) + ", data: data || {}, fn: " + t(u, l + 1) + ", inverse: " + r(u, l + 1) + ", root: root});"; else {
                        if (u.contextName.length > 0)throw new Error('Template7: Missing helper: "' + u.helperName + '"');
                        h = i(u.helperName, s), f += "if (" + h + ") {", f += "if (isArray(" + h + ")) {", f += "r += (Template7.helpers.each).call(" + s + ", " + h + ", {hash:" + JSON.stringify(u.hash) + ", data: data || {}, fn: " + t(u, l + 1) + ", inverse: " + r(u, l + 1) + ", root: root});", f += "}else {", f += "r += (Template7.helpers.with).call(" + s + ", " + h + ", {hash:" + JSON.stringify(u.hash) + ", data: data || {}, fn: " + t(u, l + 1) + ", inverse: " + r(u, l + 1) + ", root: root});", f += "}}"
                    }
                } else f += "r +='" + u.content.replace(/\r/g, "\\r").replace(/\n/g, "\\n").replace(/'/g, "\\'") + "';"
            }
            return f += "\nreturn r;})", eval.call(window, f)
        }

        var o = this;
        o.template = e, o.compile = function (e) {
            return o.compiled || (o.compiled = l(e)), o.compiled
        }
    };
    i.prototype = {
        options: {}, partials: {}, helpers: {
            _partial: function (e, t) {
                var r = i.prototype.partials[e];
                if (!r || r && !r.template)return "";
                r.compiled || (r.compiled = a.compile(r.template));
                var n = this;
                for (var l in t.hash)n[l] = t.hash[l];
                return r.compiled(n, t.data, t.root)
            }, escape: function (e, t) {
                if ("string" != typeof e)throw new Error('Template7: Passed context to "escape" helper should be a string');
                return e.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;")
            }, "if": function (e, r) {
                return t(e) && (e = e.call(this)), e ? r.fn(this, r.data) : r.inverse(this, r.data)
            }, unless: function (e, r) {
                return t(e) && (e = e.call(this)), e ? r.inverse(this, r.data) : r.fn(this, r.data)
            }, each: function (r, n) {
                var i = "", a = 0;
                if (t(r) && (r = r.call(this)), e(r)) {
                    for (n.hash.reverse && (r = r.reverse()), a = 0; a < r.length; a++)i += n.fn(r[a], {
                        first: 0 === a,
                        last: a === r.length - 1,
                        index: a
                    });
                    n.hash.reverse && (r = r.reverse())
                } else for (var l in r)a++, i += n.fn(r[l], {key: l});
                return a > 0 ? i : n.inverse(this)
            }, "with": function (e, r) {
                return t(e) && (e = e.call(this)), r.fn(e)
            }, join: function (e, r) {
                return t(e) && (e = e.call(this)), e.join(r.hash.delimiter || r.hash.delimeter)
            }, js: function (e, t) {
                var r;
                return r = e.indexOf("return") >= 0 ? "(function(){" + e + "})" : "(function(){return (" + e + ")})", eval.call(this, r).call(this)
            }, js_compare: function (e, t) {
                var r;
                r = e.indexOf("return") >= 0 ? "(function(){" + e + "})" : "(function(){return (" + e + ")})";
                var n = eval.call(this, r).call(this);
                return n ? t.fn(this, t.data) : t.inverse(this, t.data)
            }
        }
    };
    var a = function (e, t) {
        if (2 === arguments.length) {
            var r = new i(e), n = r.compile()(t);
            return r = null, n
        }
        return new i(e)
    };
    return a.registerHelper = function (e, t) {
        i.prototype.helpers[e] = t
    }, a.unregisterHelper = function (e) {
        i.prototype.helpers[e] = void 0, delete i.prototype.helpers[e]
    }, a.registerPartial = function (e, t) {
        i.prototype.partials[e] = {template: t}
    }, a.unregisterPartial = function (e, t) {
        i.prototype.partials[e] && (i.prototype.partials[e] = void 0, delete i.prototype.partials[e])
    }, a.compile = function (e, t) {
        var r = new i(e, t);
        return r.compile()
    }, a.options = i.prototype.options, a.helpers = i.prototype.helpers, a.partials = i.prototype.partials, a
}();
//# sourceMappingURL=template7.js.map

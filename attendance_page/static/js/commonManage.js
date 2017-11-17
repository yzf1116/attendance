/**
 * 获取列表
 * @param url 路由地址
 * @param data 数据{Object}
 * @param callback 回调
 */
export function getList(url, data, callback) {
    var _self = this;
    _self.$http.post(url, data)
        .then(function (res) {
            callback(res);
        })
        .catch(function (error) {
            console.log(error);
            callback({status: false});
        });
}
/**
 * 提交表单数据
 */
export function submitForm(url, data, callback) {
    var _self = this;
    _self.$http.post(url, data).then((res) => {
        _self.dialogInfo = false;
        _self.$message({
            message: '保存成功',
            type: 'success'
        })
        callback(res);
    }).catch((err) => {
        console.log(err);
    })


}
export function updateForm(url, data, callback) {
    var _self = this;
    _self.$http.post(url, data).then((res) => {
        _self.dialogInfo = false;
        _self.$message({
            message: '编辑成功',
            type: 'success'
        })
        callback(res);
    }).catch((err) => {
        console.log(err);
    })


}

/**
 * 删除
 * @param url
 * @param id
 * @param callback
 */
export function deleteOne(url, id, callback) {
    var _self = this;
    _self.$confirm('是否确定删除该条记录?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
    }).then(() => {
        _self.$http.post(url, id).then((ret) => {
            callback(ret);
        }).catch((err) => {
            console.log(err);
        })
    }).catch((err) => {
        console.log(err);
    })


}
/**
 * 批量删除
 * @param url
 * @param ids 数组,id集
 * @param callback
 */
export function deletebatch(url, ids, callback) {
    var _self = this;
    if (_self.multipleSelection.length == 0) {
        _self.$message('请勾选删除项');
        return;
    }
    _self.$confirm('是否确定删除所选项?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
    }).then(() => {
        _self.$http.post(url, ids).then((ret) => {
            callback(ret);
        }).catch((err) => {
            console.log(err);
        })
    }).catch((err) => {
        console.log(err);
    })


}


/**
 * 存储localStorage
 */
export const setStore = (name, content) => {
	if (!name) return;
	if (typeof content !== 'string') {
		content = JSON.stringify(content);
	}
	window.localStorage.setItem(name, content);
}

/**
 * 获取localStorage
 */
export const getStore = name => {
	if (!name) return;
	return window.localStorage.getItem(name);
}

/**
 * 删除localStorage
 */
export const removeStore = name => {
	if (!name) return;
	window.localStorage.removeItem(name);
}

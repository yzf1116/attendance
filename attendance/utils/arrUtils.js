/***********************************************************************
 *                           数组工具类                            *
 * ********************************************************************/
var arrUtil = {
      /**
     * 树形结构
     * 方法作用：【获得树形结构】
     * 使用方法：arrUtil.transData(src, idStr, pidStr, chindrenStr);
     * @param src 数组对象
     * @param idStr id
     * @param pidStr 父级id
     * @param chindrenStr 子集
     * @callback [{id:……,chindrenStr:[{id:……}]},{id:……,chindrenStr:[{id:……}]}]
     */
    transData:function(src, idStr, pidStr, chindrenStr,callback){
          console.log(src, idStr, pidStr, chindrenStr)
    if ((src == undefined) || (src == null) || (src == '')){
        return [];
    }

    var a = [];
          for(var i=0;i<src.length;i++){
              a.push(src[i])
          }

    var r = [], hash = {}, id = idStr, pid = pidStr, children = chindrenStr, i = 0, j = 0, len = a.length;

    for(; i < len; i++){
        hash[a[i][id]] = a[i];
    }
    for(; j < len; j++){
        var aVal = a[j], hashVP = hash[aVal[pid]];
        if(hashVP){
            !hashVP[children] && (hashVP[children] = []);
            hashVP[children].push(aVal);
        }else{
            r.push(aVal);
        }
    }

    callback(r) ;
}
}


module.exports = arrUtil;


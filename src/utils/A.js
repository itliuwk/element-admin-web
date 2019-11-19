import { MyMapObject } from './lodash';
export function downLoad (url) {
    var oA = document.createElement("a");
    oA.download = '';// 设置下载的文件名，默认是'下载'
    oA.href = url;
    oA.target = "_Blank"
    document.body.appendChild(oA);
    oA.click();
    oA.remove(); // 下载之后把创建的元素删除
}

export function createParamsUrl (params) {
    var url = ""
    params && MyMapObject(params, ((value, key) => {
        if (key) {
            url += `${key}=${value}&`
        }
    }))
    return url
}
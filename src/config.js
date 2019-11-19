export const DEVICE_TYPE_SMALL = "quxia"
export const DEVICE_TYPE_BIG = "quxia-vm"

export const IS_MOCK = true

export const client_id = 'test'
export const client_secret = "test"
var _show_in_sceen = true;

var _BASE_API = "http://192.168.0.222:8088";//
// export const BASE_API = "http://localhost:9527";//本地 mock接口请保持端口和ui的接口一样
// export const BASE_API = "http://192.168.0.222:8088";//jay的服务器接口
// export const BASE_API = "https://aiyoujiaapi.renqilai.com";//jay的服务器接口
// var _BASE_API = "https://rapapi.renqilai.com/app/mock/39";
// export const BASE_API = "https://quxiaapi.renqilai.com"
// export const BASE_API = "https://dianchuangapi.renqilai.com"
export const pageSize = 20

export const SHELF_MAX_ROW = 7
export const SHELF_MAX_COLOUM = 12

export const CHACHE_PRODUCTS = 'CHACHE_PRODUCTS'


// run build 切换地址
if (process.env.NODE_ENV == 'production') {

    _show_in_sceen = false;
    _BASE_API = "https://quxiaapi.renqilai.com";//线上
}

export const show_in_sceen = _show_in_sceen;
export const BASE_API = _BASE_API;

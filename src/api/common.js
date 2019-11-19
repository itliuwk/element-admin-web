import request from '@/utils/request'

export function GET_DEVICE_TYPES(params) {
    return request({
        url: "/api/admin/devices/types",
        method: 'get',
        params
    }).then(res => res.data.data)
}


export function GET_DEVICE_DEVICEGROUPS(params) {
    return request({
        url: "/api/admin/deviceGroups/select",
        method: 'get',
        params
    }).then(res => res.data.data)
}

export function GET_LOCATIONS(params) {
    return request({
        url: "/api/admin/locations/select",
        method: 'get',
        params
    }).then(res => res.data.data)
}


export function GET_COUPONS(params) {
    return request({
        url: "/api/admin/coupons/select",
        method: 'get',
        params
    }).then(res => res.data.data)
}


export function GET_VIPVARDS(params) {
    return request({
        url: "/api/admin/vipCards/select",
        method: 'get',
        params
    }).then(res => res.data.data)
}


export function GET_ROLES(params) {
    return request({
        url: "/api/admin/roles/select",
        method: 'get',
        params
    }).then(res => res.data.data)
}

export function GET_DEVICE_GROUPS_TOTAL(params) {
    return request({
        url: "/api/admin/deviceGroups/count",
        method: 'get',
        params
    }).then(res => res.data.data)
}

export function GET_DEIVCE_GROUPS_ALL(total) {
    return request({
        url: "/api/admin/deviceGroups",
        method: 'get',
        params: {
            from: 0,
            size: total
        }
    }).then(res => res.data.data)
}

export function GET_LOCALTION_TYPE(params) {
    return request({
        url: "/api/admin/locations/types",
        method: 'get',
        params
    }).then(res => res.data.data)
}



export function GET_clientsSel(params) {
    return request({
        url: "/api/admin/clients/select",
        method: 'get',
        params
    }).then(res => res.data.data)
}

/**
 * 根据七牛云链接返回 info 信息
 * @param url
 * @returns {Q.Promise<any> | * | Q.Promise<T | never> | PromiseLike<T | never> | Promise<T | never>}
 * @constructor
 */

export function GET_VIDEOINFO(url) {
    return request({
        url: url,
        method: 'get'
    }).then(res => res.data)
}


/**
 * 账户管理 -- 账户列表选择
 * @returns {Q.Promise<any> | * | Q.Promise<T | never> | PromiseLike<T | never> | Promise<T | never>}
 * @constructor
 */
export function GET_ACCOUNT(params) {
    return request({
        url: "/api/admin/accounts/select",
        method: 'get',
        params
    }).then(res => res.data.data)
}


/**
 * 线下卡券选择
 * @param params
 * @returns {Q.Promise<any> | * | Q.Promise<T | never> | PromiseLike<T | never> | Promise<T | never>}
 * @constructor
 */
export function GET_COUPONCARDS(params) {
    return request({
        url: "/api/admin/couponCards/select",
        method: 'get',
        params
    }).then(res => res.data.data)
}


import request from '@/utils/request'


/**
 * 个人资料 -- 详情
 * @returns {Q.Promise<any> | * | Q.Promise<T | never> | PromiseLike<T | never> | Promise<T | never>}
 * @constructor
 */
export function PROFLE(params) {
    return request({
        url: "/api/admin/profile",
        method: 'get',
        params
    }).then(res => res.data.data)
}


/**
 * 个人资料 -- 修改
 * @returns {Q.Promise<any> | * | Q.Promise<T | never> | PromiseLike<T | never> | Promise<T | never>}
 * @constructor
 */
export function PUT_PROFLE(params) {
    return request({
        url: "/api/admin/profile",
        method: 'post',
        data: params
    }).then(res => res.data.data)
}


/**
 * 个人资料 -- 修改密码
 * @returns {Q.Promise<any> | * | Q.Promise<T | never> | PromiseLike<T | never> | Promise<T | never>}
 * @constructor
 */
export function PUT_CHANGEPASSWORD(params) {
    return request({
        url: "/api/admin/changePassword",
        method: 'post',
        data: params
    }).then(res => res.data.data)
}




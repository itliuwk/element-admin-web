import request from '@/utils/request'

const url = '/api/admin';

/**
 * 用户管理 / 用户列表
 * @param params
 * @returns {Q.Promise<any> | * | Q.Promise<T | never> | PromiseLike<T | never> | Promise<T | never>}
 * @constructor
 */
export function GET_CUSTOMERS(params) {
    return request({
        url: url + "/customers",
        method: 'get',
        params
    }).then(res => res.data.data)

}


/**
 * 用户管理 / 用户总数
 * @param params
 * @returns {Q.Promise<any> | * | Q.Promise<T | never> | PromiseLike<T | never> | Promise<T | never>}
 * @constructor
 */
export function GET_CUSTOMERS_COUNT(params) {
    return request({
        url: url + "/customers/count",
        method: 'get',
        params
    }).then(res => res.data.data)
}


/**
 * 用户管理 / 详情
 * @param params
 * @returns {Q.Promise<any> | * | Q.Promise<T | never> | PromiseLike<T | never> | Promise<T | never>}
 * @constructor
 */
export function DETAIL_CUSTOMERS(params) {
    return request({
        url: url + "/customers/detail?id=" + params,
        method: 'get',
        data: params
    }).then(res => res.data.data)
}


/**
 * 用户管理 / 修改会员等级
 * @param params
 * @returns {Q.Promise<any> | * | Q.Promise<T | never> | PromiseLike<T | never> | Promise<T | never>}
 * @constructor
 */
export function CRADS_CUSTOMERS(params) {
    return request({
        url: url + "/customers/cards",
        method: 'post',
        data: params
    }).then(res => res.data.data)
}


/**
 * 用户管理 / 修改会员余额
 * @param params
 * @returns {Q.Promise<any> | * | Q.Promise<T | never> | PromiseLike<T | never> | Promise<T | never>}
 * @constructor
 */
export function BALANCE_CUSTOMERS(params) {
    return request({
        url: url + "/customers/balance",
        method: 'post',
        data: params
    }).then(res => res.data.data)
}


/**
 * 用户管理 / 详情 / 余额记录
 * @param params
 * @returns {Q.Promise<any> | * | Q.Promise<T | never> | PromiseLike<T | never> | Promise<T | never>}
 * @constructor
 */
export function SUMMARY_BALANCE_CUSTOMERS(params) {
    return request({
        url: url + "/customers/balance/summary",
        method: 'get',
        params
    }).then(res => res.data.data)
}


/**
 * 用户管理 / 详情 / 余额记录列表
 * @param params
 * @returns {Q.Promise<any> | * | Q.Promise<T | never> | PromiseLike<T | never> | Promise<T | never>}
 * @constructor
 */
export function AUDITS_BALANCE_CUSTOMERS(params) {
    return request({
        url: url + "/customers/balance/audits",
        method: 'get',
        params
    }).then(res => res.data.data)
}


/**
 * 用户管理 / 详情 / 余额记录列表总数
 * @param params
 * @returns {Q.Promise<any> | * | Q.Promise<T | never> | PromiseLike<T | never> | Promise<T | never>}
 * @constructor
 */
export function AUDITS_BALANCE_COUNT_CUSTOMERS(params) {
    return request({
        url: url + "/customers/balance/audits/count",
        method: 'get',
        params
    }).then(res => res.data.data)
}




/**
 * 用户管理 / 详情 / 消费记录
 * @param params
 * @returns {Q.Promise<any> | * | Q.Promise<T | never> | PromiseLike<T | never> | Promise<T | never>}
 * @constructor
 */
export function SUMMARY_EXPENSE_CUSTOMERS(params) {
    return request({
        url: url + "/customers/expense/summary",
        method: 'get',
        params
    }).then(res => res.data.data)
}


/**
 * 用户管理 / 详情 / 消费记录列表
 * @param params
 * @returns {Q.Promise<any> | * | Q.Promise<T | never> | PromiseLike<T | never> | Promise<T | never>}
 * @constructor
 */
export function AUDITS_EXPENSE_CUSTOMERS(params) {
    return request({
        url: url + "/customers/expense/audits",
        method: 'get',
        params
    }).then(res => res.data.data)
}

/**
 * 用户管理 / 详情 / 消费记录列表总数
 * @param params
 * @returns {Q.Promise<any> | * | Q.Promise<T | never> | PromiseLike<T | never> | Promise<T | never>}
 * @constructor
 */
export function AUDITS_EXPENSE_COUNT_CUSTOMERS(params) {
    return request({
        url: url + "/customers/expense/audits/count",
        method: 'get',
        params
    }).then(res => res.data.data)
}







/**
 * 充值管理 / 列表
 * @param params
 * @returns {Q.Promise<any> | * | Q.Promise<T | never> | PromiseLike<T | never> | Promise<T | never>}
 * @constructor
 */
export function GET_RECHARGEPLANS(params) {
    return request({
        url: url + "/rechargePlans",
        method: 'get',
        params
    }).then(res => res.data.data)
}


/**
 * 充值管理 / 总数
 * @param params
 * @returns {Q.Promise<any> | * | Q.Promise<T | never> | PromiseLike<T | never> | Promise<T | never>}
 * @constructor
 */
export function GET_RECHARGEPLANS_COUNT(params) {
    return request({
        url: url + "/rechargePlans/count",
        method: 'get',
        params
    }).then(res => res.data.data)
}



/**
 * 充值管理 / 新增
 * @param params
 * @returns {Q.Promise<any> | * | Q.Promise<T | never> | PromiseLike<T | never> | Promise<T | never>}
 * @constructor
 */
export function POST_RECHARGEPLANS(params) {
    return request({
        url: url + "/rechargePlans",
        method: 'post',
        data: params
    }).then(res => res.data.data)
}


/**
 * 充值管理 / 更新
 * @param params
 * @returns {Q.Promise<any> | * | Q.Promise<T | never> | PromiseLike<T | never> | Promise<T | never>}
 * @constructor
 */
export function PUT_RECHARGEPLANS(params) {
    return request({
        url: url + "/rechargePlans?id=" + params.id,
        method: 'put',
        data: params
    }).then(res => res.data.data)
}


/**
 * 充值管理 / 详情
 * @param params
 * @returns {Q.Promise<any> | * | Q.Promise<T | never> | PromiseLike<T | never> | Promise<T | never>}
 * @constructor
 */
export function DETAIL_RECHARGEPLANS(params) {
    return request({
        url: url + "/rechargePlans/detail?id=" + params,
        method: 'get',
        data: params
    }).then(res => res.data.data)
}


/**
 *  充值管理 /  生效
 * @param params
 * @returns {Promise<T | never>}
 * @constructor
 */
export function ENABLE_RECHARGEPLANS(params) {
    return request({
        url: url + '/rechargePlans/enable?id=' + params,
        method: 'post'
    }).then(res => res.data.data)
}


/**
 *  充值管理 /  失效
 * @param params
 * @returns {Promise<T | never>}
 * @constructor
 */
export function DISABLE_RECHARGEPLANS(params) {
    return request({
        url: url + '/rechargePlans/disable?id=' + params,
        method: 'post'
    }).then(res => res.data.data)
}



/**
 *  充值管理 /  删除
 * @param params
 * @returns {Promise<T | never>}
 * @constructor
 */
export function DELETE_RECHARGEPLANS(params) {
    return request({
        url: url + '/rechargePlans?id=' + params,
        method: 'delete',
        data: params
    }).then(res => res.data.data)
}




/**
 * 会员卡管理 / 列表
 * @param params
 * @returns {Q.Promise<any> | * | Q.Promise<T | never> | PromiseLike<T | never> | Promise<T | never>}
 * @constructor
 */
export function GET_VIPCARDS(params) {
    return request({
        url: url + "/vipCards",
        method: 'get',
        params
    }).then(res => res.data.data)
}

/**
 * 会员卡管理 / 新增
 * @param params
 * @returns {Q.Promise<any> | * | Q.Promise<T | never> | PromiseLike<T | never> | Promise<T | never>}
 * @constructor
 */
export function POST_VIPCARDS(params) {
    return request({
        url: url + "/vipCards",
        method: 'post',
        data: params
    }).then(res => res.data.data)
}


// /**
//  * 会员卡管理 / 更新
//  * @param params
//  * @returns {Q.Promise<any> | * | Q.Promise<T | never> | PromiseLike<T | never> | Promise<T | never>}
//  * @constructor
//  */
// export function PUT_VIPCARDS(params) {
//     return request({
//         url: url + "/vipCards",
//         method: 'put',
//         data:params
//     }).then(res => res.data.data)
// }


/**
 * 会员卡管理 / 详情
 * @param params
 * @returns {Q.Promise<any> | * | Q.Promise<T | never> | PromiseLike<T | never> | Promise<T | never>}
 * @constructor
 */
export function DETAIL_VIPCARDS(params) {
    return request({
        url: url + "/vipCards/detail?id=" + params,
        method: 'get',
        data: params
    }).then(res => res.data.data)
}


/**
 * 会员卡管理 / 总数
 * @param params
 * @returns {Q.Promise<any> | * | Q.Promise<T | never> | PromiseLike<T | never> | Promise<T | never>}
 * @constructor
 */
export function GET_VIPCARDS_COUNT(params) {
    return request({
        url: url + "/vipCards/count",
        method: 'get',
        params
    }).then(res => res.data.data)
}


/**
 *  会员卡管理 /  生效
 * @param params
 * @returns {Promise<T | never>}
 * @constructor
 */
export function ENABLE_VIPCARDS(params) {
    return request({
        url: url + '/vipCards/enable?id=' + params,
        method: 'post',
        data: params
    }).then(res => res.data.data)
}


/**
 *  会员卡管理 /  失效
 * @param params
 * @returns {Promise<T | never>}
 * @constructor
 */
export function DISABLE_VIPCARDS(params) {
    return request({
        url: url + '/vipCards/disable?id=' + params,
        method: 'post',
        data: params
    }).then(res => res.data.data)
}



/**
 *  会员卡管理 /  删除
 * @param params
 * @returns {Promise<T | never>}
 * @constructor
 */
export function DELETE_VIPCARDS(params) {
    return request({
        url: url + '/vipCards?id=' + params,
        method: 'delete',
        data: params
    }).then(res => res.data.data)
}


/**
 *  积分设置  /  获取
 * @returns {Promise<T | never>}
 * @constructor
 */
export function GET_CREIDTSETTINGS() {
    return request({
        url: url + '/creditSettings',
        method: 'get'
    }).then(res => res.data.data)
}

/**
 *  积分设置  /  保存
 * @returns {Promise<T | never>}
 * @constructor
 */
export function POST_CREIDTSETTINGS(params) {
    return request({
        url: url + '/creditSettings',
        method: 'post',
        data: params
    }).then(res => res.data.data)
}



/**
 * 用户管理 / 详情 / 修改会员积分
 * @param params
 * @returns {Q.Promise<any> | * | Q.Promise<T | never> | PromiseLike<T | never> | Promise<T | never>}
 * @constructor
 */
export function POST_CREDITS_CUSTOMERS(params) {
    return request({
        url: url + "/customers/credits",
        method: 'post',
        data: params
    }).then(res => res.data.data)
}



/**
 * 用户管理 / 详情 / 积分记录
 * @param params
 * @returns {Q.Promise<any> | * | Q.Promise<T | never> | PromiseLike<T | never> | Promise<T | never>}
 * @constructor
 */
export function SUMMARY_CREDITS_CUSTOMERS(params) {
    return request({
        url: url + "/customers/credits/summary",
        method: 'get',
        params
    }).then(res => res.data.data)
}


/**
 * 用户管理 / 详情 / 积分记录列表
 * @param params
 * @returns {Q.Promise<any> | * | Q.Promise<T | never> | PromiseLike<T | never> | Promise<T | never>}
 * @constructor
 */
export function AUDITS_CREDITS_CUSTOMERS(params) {
    return request({
        url: url + "/customers/credits/audits",
        method: 'get',
        params
    }).then(res => res.data.data)
}

/**
 * 用户管理 / 详情 / 积分记录总数
 * @param params
 * @returns {Q.Promise<any> | * | Q.Promise<T | never> | PromiseLike<T | never> | Promise<T | never>}
 * @constructor
 */
export function AUDITS_CREDITS_COUNT_CUSTOMERS(params) {
    return request({
        url: url + "/customers/credits/audits/count",
        method: 'get',
        params
    }).then(res => res.data.data)
}

// 可以选择的用户列表  /api/admin/accounts/select
export function select_user_lists() {
    return request({
        url: url + "/accounts/select",
        method: 'get',
    }).then(res => res.data.data)
}
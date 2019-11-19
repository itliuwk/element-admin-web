import Layout from '@/views/layout/Layout'

const userManagement = {
    path: '/userManagement',
    component: Layout,
    value:81,
    meta: {title: '用户管理', icon: 'user', noCache: true, affix: false},
    children: [

        {
            path: '/userManagement/userList',
            component: () => import('@/views/userManagement/userList/index'),
            name: '用户列表',
            value:82,
            meta: {title: '用户列表', noCache: false, affix: false}
        },

        {
            path: '/userManagement/userList/details',
            component: () => import('@/views/userManagement/userList/userDetails'),
            name: '会员详情',
            hidden:true,
            meta: {title: '会员详情', noCache: false, affix: false}
        },

        {
            path: '/userManagement/recharge',
            component: () => import('@/views/userManagement/recharge/index'),
            name: '充值管理',
            value:83,
            meta: {title: '充值管理', noCache: false, affix: false}
        },
        {
            path: '/userManagement/addRecharge',
            component: () => import('@/views/userManagement/recharge/addRecharge'),
            name: '充值活动新增/编辑',
            hidden:true,
            meta: {title: '充值活动新增/编辑', noCache: false, affix: false}
        },
        {
            path: '/userManagement/vipCard',
            component: () => import('@/views/userManagement/vipCard/index'),
            name: '会员卡管理',
            value:84,
            meta: {title: '会员卡管理', noCache: false, affix: false}
        },
        {
            path: '/userManagement/addCard',
            component: () => import('@/views/userManagement/vipCard/addCard'),
            name: '会员卡新增/编辑',
            hidden:true,
            meta: {title: '会员卡新增/编辑', noCache: false, affix: false}
        }
        ,
        {
            path: '/userManagement/integralSettings',
            component: () => import('@/views/userManagement/integralSettings/index'),
            name: '积分设置',
            meta: {title: '积分设置', noCache: false, affix: false}
        }
    ]
};

export default userManagement

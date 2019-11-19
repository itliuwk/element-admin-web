import Layout from '@/views/layout/Layout'

const advertisingManagement = {
    path: '/paymenter',
    component: Layout,
    value: 55,
    meta: { title: '支付器', icon: 'icon-', noCache: true, affix: false },
    children: [
        {
            path: '/paymenter/deviceList',
            component: () => import('@/views/paymenter/deviceList'),
            name: '设备列表',
            value: 56,
            meta: { title: '设备列表', noCache: false, affix: false }
        },
        {
            path: '/paymenter/setMeal',
            component: () => import('@/views/paymenter/setMeal'),
            name: '查看套餐',
            hidden: true,
            value: 56,
            meta: { title: '查看套餐', noCache: false, affix: false }
        },
        {
            path: '/paymenter/remote',
            component: () => import('@/views/paymenter/remote'),
            name: '远程控制',
            hidden: true,
            value: 56,
            meta: { title: '远程控制', noCache: false, affix: false }
        },
        {
            path: '/paymenter/setMealManger',
            component: () => import('@/views/paymenter/setMealManger'),
            name: '套餐管理',
            value: 56,
            meta: { title: '套餐管理', noCache: false, affix: false }
        },
        {
            path: '/paymenter/addMeal',
            component: () => import('@/views/paymenter/editMeal/addMeal'),
            name: '套餐管理/添加套餐',
            hidden: true,
            value: 56,
            meta: { title: '套餐管理/添加套餐', noCache: false, affix: false }
        },
        {
            path: '/paymenter/putawayShelf',
            component: () => import('@/views/paymenter/putawayShelf/putawayShelf'),
            name: '套餐管理/设备上架',
            hidden: true,
            value: 56,
            meta: { title: '套餐管理/设备上架', noCache: false, affix: false }
        },
        {
            path: '/paymenter/editMeal',
            component: () => import('@/views/paymenter/editMeal/editMeal'),
            name: '套餐管理/编辑套餐',
            hidden: true,
            value: 56,
            meta: { title: '套餐管理/编辑套餐', noCache: false, affix: false }
        },
    ]
};

export default advertisingManagement

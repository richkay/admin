import Parent from '../views/parent.vue'
import Blank from '../views/blank.vue'

export default [
    {
        path: '/admin/login',
        component (resolve) {
            require(['../views/login.vue'], resolve);
        },
        name: 'admin.login',
        meta: {
            title: '登录',
            auth: false,
        },
    },
    {
        path: '/admin/403',
        component (resolve) {
            require(['../views/errors/403.vue'], resolve);
        },
        name: 'admin.403',
        meta: {
            title: '403',
            auth: false,
        },
    },
    {
        path: '/admin',
        component: Parent,
        meta: {
            title: '首页'
        },
        children: [
            {
                path: '/',
                component (resolve) {
                    require(['../views/dashboard.vue'], resolve);
                },
                name: 'admin.dashboard',
                meta: {
                    title: '控制台',
                    auth: true,
                }
            },
/*            {
                path: 'system',
                component: Blank,
                meta: {
                    title: '系统管理'
                },
                children: [
                    {
                        path: 'log',
                        component (resolve) {
                            require(['../views/system/log/index.vue'], resolve);
                        },
                        name: 'admin.system.log',
                        meta: {
                            title: '操作日志',
                            auth: true,
                        },
                    },
                    {
                        path: 'menu',
                        component (resolve) {
                            require(['../views/system/menu/index.vue'], resolve);
                        },
                        name: 'admin.system.menu',
                        meta: {
                            title: '菜单管理',
                            auth: true,
                        },
                    }
                ],
            },*/
            {
                path: 'users',
                component: Blank,
                meta: {
                    title: '用户管理'
                },
                children: [
                    {
                        path: 'user',
                        component (resolve) {
                            require(['../views/users/user/index.vue'], resolve);
                        },
                        name: 'admin.users.user',
                        meta: {
                            title: '用户',
                            auth: true,
                        }
                    },
                    /*{
                        path: 'role',
                        component (resolve) {
                            require(['../views/users/role/index.vue'], resolve);
                        },
                        name: 'admin.users.role',
                        meta: {
                            title: '角色管理',
                            auth: true,
                        },
                    },
                    {
                        path: 'role/create',
                        component (resolve) {
                            require(['../views/users/role/form.vue'], resolve);
                        },
                        name: 'admin.users.role.create',
                        meta: {
                            title: '创建角色',
                            auth: true,
                        }
                    },
                    {
                        path: 'role/:id/edit',
                        component (resolve) {
                            require(['../views/users/role/form.vue'], resolve);
                        },
                        name: 'admin.users.role.edit',
                        meta: {
                            title: '编辑角色',
                            auth: true,
                        },
                    },*/
                ],
            },
            {
                path: ':model',
                component: Blank,
                children: [
                    {
                        path: ':id/edit',
                        component (resolve) {
                            require(['../views/model/form.vue'], resolve);
                        },
                        name: 'admin.model.edit',
                        meta: {
                            auth: true,
                        },
                    },
                    {
                        path: 'create',
                        component (resolve) {
                            require(['../views/model/form.vue'], resolve);
                        },
                        name: 'admin.model.create',
                        meta: {
                            auth: true,
                        },
                    },
                    {
                        path: '/',
                        component (resolve) {
                            require(['../views/model/index.vue'], resolve);
                        },
                        name: 'admin.model.index',
                        meta: {
                            auth: true,
                        }
                    },
                ],
            },
        ],
    }
];

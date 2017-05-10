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
            title: '登录'
        }
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
                    title: '控制台'
                }
            },
            {
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
                            title: '操作日志'
                        },
                    },
                    {
                        path: 'menu',
                        component (resolve) {
                            require(['../views/system/menu/index.vue'], resolve);
                        },
                        name: 'admin.system.menu',
                        meta: {
                            title: '菜单管理'
                        },
                    }
                ],
            },
            {
                path: 'manager',
                component: Blank,
                meta: {
                    title: '管理组'
                },
                children: [
                    {
                        path: 'user',
                        component (resolve) {
                            require(['../views/manager/user/index.vue'], resolve);
                        },
                        name: 'admin.manager.user',
                        meta: {
                            title: '管理员'
                        }
                    },
                    {
                        path: 'role',
                        component (resolve) {
                            require(['../views/manager/role/index.vue'], resolve);
                        },
                        name: 'admin.manager.role',
                        meta: {
                            title: '角色管理'
                        },
                    },
                    {
                        path: 'role/create',
                        component (resolve) {
                            require(['../views/manager/role/form.vue'], resolve);
                        },
                        name: 'admin.manager.role.create',
                        meta: {
                            title: '创建角色'
                        }
                    },
                    {
                        path: 'role/:id/edit',
                        component (resolve) {
                            require(['../views/manager/role/form.vue'], resolve);
                        },
                        name: 'admin.manager.role.edit',
                        meta: {
                            title: '编辑角色'
                        },
                    },
                ],
            },
            {
                path: '403',
                component (resolve) {
                    require(['../views/errors/403.vue'], resolve);
                },
                name: 'admin.403',
                meta: {
                    title: '403'
                },
            },
            {
                path: '*',
                redirect: {
                    name: 'admin.dashboard'
                },
            },
        ],
    }
];

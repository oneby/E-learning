import App from '../App.vue'
export default [{
    path: '/',
    component: App,
    children: [{
            path: '',
            component: r => require.ensure([], () => r(require('../components/login/login.vue')), 'longin'),
            // meta: {
            //     requireAuth: true
            // }
        },
        {
            path: '/basic',
            component: r => require.ensure([], () => r(require('../components/basic/basic.vue')), 'basic'),
            redirect: '/basic/home',
            children: [{
                path: 'home',
                component: r => require.ensure([], () => r(require('../components/basic/home/home.vue')), 'home')
            }, {
                path: 'upclass',
                component: r => require.ensure([], () => r(require('../components/basic/upclass/upclass.vue')), 'upclass')
            }, {
                path: 'downwork',
                component: r => require.ensure([], () => r(require('../components/basic/downwork/downwork')), 'downwork')

            }, {
                path: 'upwork',
                component: r => require.ensure([], () => r(require('../components/basic/upwork/upwork.vue')), 'upwork')
            }, {
                path: 'downclass',
                component: r => require.ensure([], () => r(require('../components/basic/downclass/downclass.vue')), 'downclass')

            }]

        },
        {
            path: 'manage',
            component: r => require.ensure([], () => r(require('../components/management/management.vue')), 'manage')

        }

        // {

        //     meta: {
        //         requireAuth: true
        //     }
        // }
    ]
}]
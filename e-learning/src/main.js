// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import routes from './router'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import ElementUI from 'element-ui'
import iView from 'iview'
import axios from 'axios'
import 'iview/dist/styles/iview.css'
import 'element-ui/lib/theme-chalk/index.css'
import store from './vuex/'
Vue.config.productionTip = false
    // axios.defaults.baseURL = 'http://rap2api.taobao.org/app/mock/1162/'
Vue.prototype.$axios = axios

Vue.use(Vuex)
Vue.use(ElementUI)
Vue.use(iView)
Vue.use(VueRouter)

Vue.config.productionTip = false
const router = new VueRouter({
    routes
})
router.beforeEach((to, from, next) => {
        if (to.meta.requireAuth) {
            if (store.state.userdata.role === 44) {
                console.log(store.state.userdata.role)
                console.log('验证失败')
                next({
                    path: '/',
                    query: {
                        redirect: to.fullPath
                    }
                })
            } else {
                console.log(store.state.userdata.role)
                console.log('验证成功')
                next()
            }
        } else {
            next()
        }
    })
    /* eslint-disable no-new */
new Vue({
    router, // router这个名字不能改
    store
    // render: h => h(App)
}).$mount('#app')
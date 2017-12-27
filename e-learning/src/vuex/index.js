import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
    /* eslint-disable no-new */
const state = {
    userdata: {
        'id': '',
        'name': '',
        'role': 0,
    }
}
const mutations = {
    updata(state, userData) {
        state.userdata.id = userData.accountnum
        state.userdata.name = userData.name
        state.userdata.role = userData.role
    }
}
export default new Vuex.Store({
    state,
    mutations
})
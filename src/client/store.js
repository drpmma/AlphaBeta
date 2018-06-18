import Vuex from 'vuex'
import Vue from 'vue'
import Cookie from '@/client/cookie'

Vue.use(Vuex);
let store = new Vuex.Store({
    state: {
        user: {},
        token: null
    },
    mutations: {
        ["login"]: (state, data) => {
            state.token = data
            Cookie.set('username', data, 1000*60)
        },
        ["logout"]: (state) => {
            state.token = null
            Cookie.delete('username')
        }
    }
})
export default store
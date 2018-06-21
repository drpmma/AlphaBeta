import Vuex from 'vuex'
import Vue from 'vue'
import Cookie from '@/client/cookie'

Vue.use(Vuex);
let store = new Vuex.Store({
    state: {
        user: {},
        token: null,
        dic: null
    },
    mutations: {
        login: (state, data) => {
            state.token = data
            Cookie.set('username', data, 1000*60)
        },
        logout: (state) => {
            state.token = null
            state.dic = null
            Cookie.delete('username')
            Cookie.delete('lastdic')
        },
        saveDic: (state, data) => {
            state.dic = data
            Cookie.set('lastdic', data, 1000*60)
        }
    }
})
export default store
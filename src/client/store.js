import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex);
export default new Vuex.Store({
    state: {
        user: {}
    },
    mutations: {
        ["login"]: (state, data) => {
            state.user = data
        },
        ["logout"]: (state) => {
            state.user = {}
        }
    }
})
import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import common from './modules/common'
import tagsView from './modules/tagsView'
import user from './modules/user'
import inventory from './modules/inventory'
import dashboard from './modules/dashboard'
import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
        app,
        common,
        tagsView,
        user,
        inventory,
        dashboard
    },
    getters,
});

export default store

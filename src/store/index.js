import Vue from 'vue'
import Vuex from 'vuex'
import {locations} from './modules/locations'
Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
        locations,
    }
})

export {store}

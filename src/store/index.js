import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersist from 'vuex-persist';
Vue.use(Vuex)
import auth from "./auth";
const vuexLocalStorage = new VuexPersist({
    // key: 'vuex' // The key to store the state on in the storage provider.
    storage: window.localStorage, // or window.sessionStorage or localForage
    reducer: state => ({
        auth: state.auth
    })
})
export default new Vuex.Store({
    modules: {
        auth
    },
    // plugins: [vuexLocalStorage.plugin],
})
import axios from 'axios'
import moment from "moment"
import jwt from "jsonwebtoken"

const url = 'https://test-fivem.azurewebsites.net'
const headers = {
    'Authorization': 'Basic Y3J5cHRvOjItMDktMjAyMg==',
    'Content-Type': 'application/json'
}
export default {
    namespaced: true,
    state: {
        token: null,
        userInfo: null,
    },
    getters: {
        getAuth(state) {
            return (state.token)?jwt.decode(state.token):null;
        },
    },
    mutations: {
        setToken(state, val) {
            state.token = val
        }
    },
    actions: {
        async signUpWeb3({ commit, state }, val) {
            let uri = url + '/auth/signUpWeb3'
            try {
                let result = await axios({ url: uri, headers: headers, method: 'POST', data: val })
                console.log('signUpWeb3', result);
                commit('setToken', null)
            } catch (error) {
                console.log(error);
            }
        },
        async signInWeb3({ commit, state }, val) {
            let uri = url + '/auth/signInWeb3'
            try {
                let result = await axios({ url: uri, headers: headers, method: 'POST', data: val })
                console.log('signInWeb3', result);
                if(result.status==200){
                    commit('setToken', result.data.data.token)
                }else{
                    commit('setToken', null)
                }
            } catch (error) {
                commit('setToken', null)
                console.log(error);
            }
        },
        signOut({ commit, state }){
            commit('setToken', null)
        }
    }
}
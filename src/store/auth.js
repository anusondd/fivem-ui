import axios from 'axios'
import moment from "moment"
import jwt from "jsonwebtoken"
import { HttpClient } from "./http/http-client"

const url = 'https://test-fivem.azurewebsites.net'
export default {
    namespaced: true,
    state: () => {
        return {
            token: null,
            userInfo: null,
        }
    },
    getters: {
        getAuth(state) {
            return (state.token) ? jwt.decode(state.token) : null;
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
                let result = await HttpClient({ url: uri, method: 'POST', data: val })
                // console.log('data', result);
                if (result.status == 200) {
                    commit('setToken', result.data.data.token)
                    return null
                }
                if (result.status == 409) {
                    commit('setToken', null)
                    return result.data.data.description;
                }
            } catch (error) {
                // console.log(error);
                return error
            }
        },
        async signInWeb3({ commit, state }, val) {
            let uri = url + '/auth/signInWeb3'
            try {
                let result = await HttpClient({ url: uri, method: 'POST', data: val })
                // console.log('signInWeb3', result);
                if (result.status == 200) {
                    commit('setToken', result.data.data.token)
                    return false; 
                } else if (result.status == 409) {
                    commit('setToken', null)
                    return true; 
                } else {
                    commit('setToken', null)
                    return false; 
                }
            } catch (error) {
                commit('setToken', null)
                // console.log(error);
            }
        },
        signOut({ commit, state }) {
            commit('setToken', null)
        }
    }
}
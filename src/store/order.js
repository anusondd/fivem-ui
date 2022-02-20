import { HttpClient } from "./http/http-client"

const url = 'https://test-fivem.azurewebsites.net'
export default {
    namespaced: true,
    state: () => {
        return {}
    },
    getters: {},
    mutations: {},
    actions: {
        async addTrasaction({ commit, state }, val) {
            let uri = url + '/web3/addTrasaction'
            try {
                let result = await HttpClient({ url: uri, method: 'POST', data: val })
                // console.log('addTrasaction', result);
                if (result.status == 200) {
                    return result.data.data
                }
            } catch (error) {
                // console.log(error);
                return error
            }
        },
        async confirmTransaction({ commit, state }, val) {
            let uri = url + '/web3/confirmTransaction'
            try {
                let result = await HttpClient({ url: uri, method: 'POST', data: val })
                // console.log('confirmTransaction', result);
                if (result.status == 200) {
                    return result.data.data; 
                }
            } catch (error) {
                // console.log(error);
                return error
            }
        },
    }
}
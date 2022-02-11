import axios from 'axios';

axios.interceptors.request.use((config) => {
    config.headers = {
        'Authorization': 'Basic Y3J5cHRvOjItMDktMjAyMg==',
        'Content-Type': 'application/json'
    }
    return config;

});


axios.interceptors.response.use(
    (response) => {
        // console.log('response-success', response);
        let status = response.status || 200;
        // console.log('interceptors',response);
        if (status == 201) {
            let title = response.data.title || 'อื่นๆ';
            let text = response.data.description || '';
            // notification.success(title, text)
        }
        return response;
    },
    (error) => {
        console.error('response-error', error);
        let status = (error.response.status) ? error.response.status : 500;
        if (status == 401) {
            let title = error.response.title || 'อื่นๆ';
            let text = error.response.description || 'ไม่ทราบ';
        } else if (status == 400) {
            let title = error.response.title || 'อื่นๆ';
            let text = error.response.description || 'ไม่ทราบ';
            // notification.warn(title, text)
        } else if (status == 403) {
            let title = error.response.title || 'อื่นๆ';
            let text = error.response.description || 'ไม่ทราบ';
            // notification.warn(title, text)
        } else if (status == 404) {
            let title = error.response.title || 'อื่นๆ';
            let text = error.response.description || 'ไม่ทราบ';
            // notification.warn(title, text)
        } else if (status == 409) {
            let title = error.response.title || 'อื่นๆ';
            let text = error.response.description || 'ไม่ทราบ';
            // notification.warn(title, text)
        } else if (status == 500) {
            let title = error.response.title || 'อื่นๆ';
            let text = error.response.description || 'ไม่ทราบ';
            // notification.error(title, text)
            return new Promise((resolve, reject) => {
                reject(error);
            });
        } else {
            let title = error.response.title || 'อื่นๆ';
            let text = error.response.description || 'ไม่ทราบ';
            // notification.error(title, text)
            return new Promise((resolve, reject) => {
                reject(error);
            });
        }
        return error.response;
    }
);

export const HttpClient = axios

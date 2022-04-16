import axios from 'axios';
const baseURL = 'http://127.0.0.1:81';

/**
 * 创建axios实例
 */
const axiosInstance = axios.create({
    baseURL,
    timeout: 15000,
    headers: {
        'Content-Type': 'multipart/form-data'
    },
});

/**
 * 请求拦截
 */
axiosInstance.interceptors.request.use(
    function (config) {
        return config;
    },
    function (error) {
        return Promise.reject(error);
    },
);

/**
 * 响应拦截
 */
axiosInstance.interceptors.response.use(
    function (response) {
        return response.data;
    },
    function (error) {
        return Promise.reject(error);
    },
);

export const request = axiosInstance.request;

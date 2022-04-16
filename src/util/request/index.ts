import axios from 'axios';
const baseURL = 'http://weixin-api.echgsss.cn:81';

/**
 * 创建axios实例
 */
const axiosInstance = axios.create({
    baseURL,
    timeout: 15000,
});

/**
 * 请求拦截
 */
axiosInstance.interceptors.request.use(
    function (config) {
        console.log(config, '参数');
        return config;
    },
    function (error) {
        // 对请求错误做些什么
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

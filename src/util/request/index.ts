import axios from 'axios';
import Setting from '@/util/index';
import type { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';

/**
 * 创建axios实例
 */
const axiosInstance = axios.create({
    baseURL: Setting.baseUrl,
    timeout: 15000,
    headers: {
        'Content-Type': 'multipart/form-data'
    },
});

/**
 * 请求拦截
 */
axiosInstance.interceptors.request.use(
    (config: AxiosRequestConfig) => {
        return config;
    },
    (error: AxiosError) => {
        return Promise.reject(error);
    },
);

/**
 * 响应拦截
 */
axiosInstance.interceptors.response.use(
    (response: AxiosResponse) => {
        return response.data;
    },
    (error: AxiosError) => {
        return Promise.reject(error);
    },
);

export const request = axiosInstance.request;

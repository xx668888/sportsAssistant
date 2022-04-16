import axios, { AxiosRequestConfig } from 'axios'
import { MyResponseType } from './types'

const instance = axios.create({
    baseURL: 'http://localhost:81',
    headers: {
        'Content-Type': 'multipart/form-data'
    }
})

const request = async <T = any>(config: AxiosRequestConfig): Promise<MyResponseType<T>> => {
    try {
        const { data } = await instance.request<MyResponseType<T>>(config)
        // data.code === 0 ? console.log("%cred", "color: blue;", data.msg) // 成功消息提示
        //     : console.error("%cred", "color: red;", data.msg) // 失败消息提示
        return data
    } catch (err: any) {
        const message = err.message || '请求失败'
        // console.error("%cred", "color: red;", message) // 失败消息提示
        return {
            code: -1,
            message,
            data: null as any
        }
    }
}

export default request;

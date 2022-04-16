import { User } from '@/api/types/sports';
import request from '@/util/request/index'

export const mi = () => {
    return request<User>({
        url: 'http://localhost:81/v1/sport/submit/mi',
        method: 'post'
    })
}

export const xin = () => {
    return request<User>({
        url: 'http://localhost:81/v1/sport/submit/xin',
        method: 'post'
    })
}
export const ydq = () => {
    return request<User>({
        url: 'http://localhost:81/v1/sport/submit/yqd',
        method: 'post'
    })
}

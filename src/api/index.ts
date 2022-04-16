import { request } from '@/util/request/index';

export const mi = (data) => {
    return request({
        url: '/v1/sport/submit/mi',
        method: 'post',
        data
    })
}

export const xin = (data) => {
    return request({
        url: '/v1/sport/submit/xin',
        method: 'post',
        data
    })
}
export const ydq = (data) => {
    return request({
        url: '/v1/sport/submit/yqd',
        method: 'post',
        data
    })
}

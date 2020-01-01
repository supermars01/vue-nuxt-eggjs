// 负责axios的各种配置，前缀，token管理，路由跳转
import Vue from 'vue'
import axios from 'axios'

let service = axios.create({
    timeout: 5000,
    baseURL: '/api'
})

service.interceptors.request.use(
    config => {
        return config
    },
    error => {
        return Promise.reject(error)
    }
)

service.interceptors.response.use(
    async response => {
        let {data} = response;
        return data;
    }
)

Vue.prototype.$http = service;  
export const http = service;
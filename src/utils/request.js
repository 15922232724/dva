import axios from 'axios';
import $$ from 'cmn-utils';
import storeIndex from '@/index';
import { routerRedux } from 'dva/router';
import { antdNotice } from 'components/Notification';
const notice = antdNotice;

function getLocalToken () {
    const token = $$.getStore("token")
    return token
}
let getNet = function () {
    const instance = axios.create({
        baseURL: '/api',
        timeout: 3000,
        headers: {
            'Authorization': getLocalToken(),
        }
    });
    //请求拦截处理
    instance.interceptors.request.use(function (config) {
        // 在发送请求之前做些什么
        return config;
    }, function (error) {
        // 对请求错误做些什么
        return Promise.reject(error);
    });

    //返回拦截处理
    instance.interceptors.response.use(function (response) {
        // 对响应数据做点什么
        return response.data;
    }, function (err) {
        // 对响应错误做点什么
        // 请求错误全局拦截
        const { dispatch } = storeIndex
        if (err.response.status && err.response.status === 401) {
            notice.error(err.response.data.detail);
            dispatch(routerRedux.replace('/sign/login'));
            return Promise.reject(err);
        }
        notice.error(err.response.data.detail || err.response.data.title);
        return Promise.reject(err);
    });
    return instance;
}
let Net = getNet();

export function rest () {
    Net = getNet();
}
export { Net };
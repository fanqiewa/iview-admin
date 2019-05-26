import axios from 'axios';
import Cookies from 'js-cookie'
import Vue from 'vue'

// 创建axios实例

const service = axios.create({
  baseURL: process.env.BASE_API, // api的base_url,可以自己设置
  timeout: 30000 // 请求超时时间
})

//request拦截器
service.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  let token = Cookies.get('token');
  if (token) {
    config.headers['X-Token'] = token;
  }
  return config;
}, function (error) {

  // 对请求错误做些什么
  return Promise.reject(error);
});

//response拦截器
service.interceptors.response.use(response => {
  const res = response.data;
  if (res.code < 1000) {
    return response;
  } else {
    if (res.code === 50008) {

    }
  }
})


export default service

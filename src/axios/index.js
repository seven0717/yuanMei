import axios from 'axios';
import qs from 'qs';

axios.defaults.baseURL = 'https://elm.cangdu.org'; // 全局的地址
// axios.defaults.headers.common['Authorization'] = 'Bearer '+ localStorage.getItem('token');
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';


// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  if (config.method === 'post'){
    config.data = qs.stringify(config.data)
  }
  console.log('fasong');
  return config;
}, function (error) {
  // 对请求错误做些什么
  console.log('错误');
  return Promise.reject(error);
});


// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  if(!response.data){
    return {
      msg:"数据返回不合理"
    }
  }
  console.log('jiehsou');
  return response;
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error);
});

export default axios;

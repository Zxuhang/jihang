import axios from 'axios'
// import VueAxios from 'vue-axios'

var Request  = axios.create({//axios实例挂载
  // baseURL: 'http://api.zuitaikj.com/api/v1',//正式
  baseURL: 'http://ceshiapi.zuitaikj.com/api/v1',//测试
  timeout: 3000,
  headers: {'X-Custom-Header': 'foobar'}
});
export default Request;
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import Request from '../../myAxios/myAxios'
Vue.prototype.myRequest = Request;//axios实例挂载
// Vue.use(VueAxios, axios);
Vue.use( MintUI);

Vue.config.productionTip = false
Vue.filter('toInt',function(value){
  if(value){
    return parseInt(value);
  }
})
Vue.filter('toFloat',function(value){
  if(value){
    return parseFloat(value);
  }
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

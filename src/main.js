import Vue from 'vue'
import App from './App.vue'
import router from './router'

import echarts from 'echarts'
Vue.prototype.$echarts = echarts

//导入ElementUI相关内容
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI);

// 导入全局样式表
import "./assets/css/global.css"

import store from './store'

//全局api
import api from './assets/config/api.js'
Vue.prototype.$api = api

//全局axios配置
import axios from 'axios'
Vue.prototype.$axios = axios

//富文本编辑器 
import quillEditor from 'vue-quill-editor'
Vue.use(quillEditor);
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

//请求拦截器 发送请求前,会发送一个token
axios.interceptors.request.use((config) => {
  var temp;
  print(config);
  if ((temp = window.sessionStorage.getItem("token")) != null) {
    config.headers.token = window.sessionStorage.getItem('token');
  }
  return config;
}, (error) => {
  Vue.prototype.$message.error("请求错误");
  return Promise.reject(error);
}
);
//响应拦截器 发送请求前,会发送一个token
axios.interceptors.response.use((config) => {
  print(config);
  if(config.data.code == undefined || config.data.code == null){
    return config;
  }
  else if(config.data.code == 500){
    this.$message.error("长时间未操作，请重新登录");
    window.sessionStorage.clear();
    this.$router.push("/login");
  }
  return config;
  
}, (error) => {
  //当响应异常时
  let isTimeout = error.toString().includes('timeout')
  if (isTimeout) {
    Vue.prototype.$message({
      message: '请求超时...',
      type: 'warning',
      duration: 2000,
      showClose: true
    })
  }
  return Promise.reject(error);
}
);

//全局调试用打印功能
print = async function (object) {
  console.log(object);
}
Vue.prototype.$print = print;

//md5加密
import md5 from 'js-md5'
Vue.prototype.$md5 = md5

//引入全局组件
import adminCompanyDetail from './components/admin/adminCompanyDetail.vue'
Vue.component('admin-company-detail', adminCompanyDetail);
import adminLoanDetail from './components/admin/adminLoanDetail.vue'
Vue.component('admin-loan-detail', adminLoanDetail);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

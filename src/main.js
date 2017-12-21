// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
Vue.config.productionTip = false
// import * as filters from './filters'; // 全局vue filter

Vue.config.productionTip = false
Vue.filter('statusFilter', (status) => {  // 启停状态过滤器
  const statusMap = {
    0: '未完成',
    1: '已完成',
    2: '已取消'
  }
  return statusMap[Number(status)]
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  data () {
    return {
      admin: 1,
      todoItem: localStorage.getItem('todoItem') ? JSON.parse(localStorage.getItem('todoItem')) : []
    }
  },
  template: '<App/>',
  components: { App }
})

import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store/index'
import AppDate from '@/components/AppDate'

Vue.component('AppDate', AppDate)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
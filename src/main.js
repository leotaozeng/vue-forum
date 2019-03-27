import Vue from 'vue'
import NProgress from 'nprogress'
import App from '@/App.vue'
import router from '@/router/index'
import store from '@/store/index'
import AppDate from '@/components/AppDate'
import '../firebase.config'

Vue.component('AppDate', AppDate)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
  beforeCreate () {
    NProgress.configure({
      speed: 100,
      showSpinner: false
    })
    NProgress.start()
  }
}).$mount('#app')

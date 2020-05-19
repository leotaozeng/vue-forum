import '@babel/polyfill'
import Vue from 'vue'
import Vuelidate from 'vuelidate'
import App from '@/App.vue'
import router from 'Router/index'
import store from 'Store/index'
import AppDate from 'Components/AppDate'
import '@/firebase.config'

Vue.use(Vuelidate)
Vue.component('AppDate', AppDate)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

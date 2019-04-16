import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'
import categories from './modules/categories'
import forums from './modules/forums'
import threads from './modules/threads'
import posts from './modules/posts'
import users from './modules/users'
import auth from './modules/auth'

Vue.use(Vuex)

const store = new Vuex.Store({
  strict: true,
  state: {
    showPage: false
  },
  mutations,
  actions,
  modules: {
    auth,
    categories,
    forums,
    threads,
    posts,
    users
  }
})

export default store

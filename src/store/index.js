import Vue from 'vue'
import Vuex from 'vuex'
import { mutations } from './mutations'
import actions from './actions'
// import data from '@/data.json'
import { countObjectProperties } from '@/utils'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    categories: {},
    forums: {},
    threads: {},
    posts: {},
    users: {},
    authId: 'VXjpr2WHa8Ux4Bnggym8QFLdv5C3'
  },

  getters: {
    authUser: state => {
      // return state.users[state.authId]
      return {}
    },
    // we can't pass arguments to getters by default
    // dynamic getter
    userThreadsCount: state => id => countObjectProperties(state.users[id].threads),

    userPostsCount: state => id => countObjectProperties(state.users[id].posts),

    repliesCount: state => id => {
      const count = countObjectProperties(state.threads[id].posts)

      return count ? count - 1 : count
    }
  },

  mutations,
  actions
})

export default store

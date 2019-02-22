import Vue from 'vue'
import Vuex from 'vuex'
import { mutations } from './mutations'
import actions from './actions'
import data from '@/data.json'
import { countObjectProperties } from '@/utils'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    ...data,
    authId: 'VXjpr2WHa8Ux4Bnggym8QFLdv5C3'
  },

  getters: {
    authUser: state => {
      const { users, authId } = state

      return users[authId]
    },

    // dynamic getter
    userPostsCount (state) {
      return function (id) {
        return countObjectProperties(state.users[id])
      }
    }
  },

  mutations,
  actions
})

export default store

import Vue from 'vue'
import Vuex from 'vuex'
import { mutations } from './mutations'
import actions from './actions'
import sourceData from '@/data.json'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    sourceData
  },
  mutations,
  actions
})

export default store

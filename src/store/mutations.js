import Vue from 'vue'
import { SET_SHOW_PAGE, SET_ITEM } from './mutation-types'

export default {
  [SET_SHOW_PAGE] (state, status) {
    state.showPage = status
  },

  [SET_ITEM] (state, { resource, id, item }) {
    item['.key'] = id

    Vue.set(state[resource].items, id, item)
  }
}

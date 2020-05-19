import Vue from 'vue'
import { SET_ITEM } from './mutation-types'

export default {
  [SET_ITEM](state, { resource, id, item }) {
    item['.key'] = id

    Vue.set(state[resource].items, id, item)
  }
}

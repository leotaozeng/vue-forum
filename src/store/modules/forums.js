import { ADD_THREAD_TO_FORUM } from '../mutation-types'
import { makeAppendChildToParentMutation } from '../assetHelpers'

export default {
  namespaced: true,

  state: {
    items: {} // store.state.forums.items[id]
  },

  mutations: {
    [ADD_THREAD_TO_FORUM]: makeAppendChildToParentMutation({
      parent: 'forums',
      child: 'threads'
    })
  },

  actions: {
    fetchForum: ({ dispatch }, { id }) =>
      dispatch('fetchItem', { id, resource: 'forums' }, { root: true }),

    fetchForums: ({ dispatch }, { ids }) =>
      dispatch('fetchItems', { ids, resource: 'forums' }, { root: true })
  }
}

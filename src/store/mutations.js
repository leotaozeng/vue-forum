import Vue from 'vue'
import { makeAppendChildToParentMutation, makeSetItemMutation } from '../utils'
import { SET_THREAD, SET_POST, SET_USER, SET_AUTH_USER, SET_ITEM, ADD_POST_TO_THREAD, ADD_CONTRIBUTOR_TO_THREAD, ADD_POST_TO_USER, ADD_THREAD_TO_FORUM, ADD_THREAD_T0_USER } from './mutation-types'

export default {
  [SET_THREAD]: makeSetItemMutation({ resource: 'threads' }),

  [SET_POST]: makeSetItemMutation({ resource: 'posts' }),

  [SET_USER]: makeSetItemMutation({ resource: 'users' }),

  [SET_AUTH_USER] (state, id) {
    state.authId = id
  },

  [SET_ITEM] (state, { resource, id, item }) {
    item['.key'] = id

    Vue.set(state[resource], id, item)
  },

  // Accept a parent id and a child id.
  [ADD_CONTRIBUTOR_TO_THREAD]: makeAppendChildToParentMutation({ parent: 'threads', child: 'contributors' }),

  [ADD_POST_TO_THREAD]: makeAppendChildToParentMutation({ parent: 'threads', child: 'posts' }),

  [ADD_POST_TO_USER]: makeAppendChildToParentMutation({ parent: 'users', child: 'posts' }),

  [ADD_THREAD_TO_FORUM]: makeAppendChildToParentMutation({ parent: 'forums', child: 'threads' }),

  [ADD_THREAD_T0_USER]: makeAppendChildToParentMutation({ parent: 'users', child: 'threads' })
}

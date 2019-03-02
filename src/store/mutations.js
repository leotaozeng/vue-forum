import Vue from 'vue'
import { makeAppendChildToParentMutation } from '../utils'

export const mutations = {
  SET_THREAD (state, { threadId, thread }) {
    const { threads } = state

    Vue.set(threads, threadId, thread)
  },

  SET_POST (state, { postId, post }) {
    const { posts } = state

    Vue.set(posts, postId, post)
  },

  SET_USER (state, { userId, user }) {
    const { users } = state

    Vue.set(users, userId, user)
  },

  SET_ITEM (state, { resource, id, item }) {
    item['.key'] = id

    Vue.set(state[resource], id, item)
  },
  // accept a parent id and a child id
  // find the parent resource in the state
  ADD_POST_TO_THREAD: makeAppendChildToParentMutation({ parent: 'threads', child: 'posts' }),

  ADD_POST_TO_USER: makeAppendChildToParentMutation({ parent: 'users', child: 'posts' }),

  ADD_THREAD_TO_FORUM: makeAppendChildToParentMutation({ parent: 'forums', child: 'threads' }),

  ADD_THREAD_T0_USER: makeAppendChildToParentMutation({ parent: 'users', child: 'threads' })
}

import Vue from 'vue'
import { makeAppendChildToParentMutation } from '../utils'

export const mutations = {
  setThread (state, { threadId, thread }) {
    const { threads } = state

    Vue.set(threads, threadId, thread)
  },

  setPost (state, { postId, post }) {
    const { posts } = state

    Vue.set(posts, postId, post)
  },

  updateUser (state, { userId, user }) {
    const { users } = state

    Vue.set(users, userId, user)
  },
  // accept a parent id and a child id
  // find the parent resource in the state
  // threadId, postId
  addPostToThread: makeAppendChildToParentMutation({ parent: 'threads', child: 'posts' }),

  addPostToUser: makeAppendChildToParentMutation({ parent: 'users', child: 'posts' }),

  addThreadToForum: makeAppendChildToParentMutation({ parent: 'forums', child: 'threads' }),

  addThreadToUser: makeAppendChildToParentMutation({ parent: 'users', child: 'threads' })
}

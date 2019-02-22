import Vue from 'vue'

export const mutations = {
  setThread (state, { threadId, thread }) {
    const { threads } = state

    Vue.set(threads, threadId, thread)
  },

  setPost (state, { postId, post }) {
    const { posts } = state

    Vue.set(posts, postId, post)
  },

  addPostToThread (state, { threadId, postId }) {
    const thread = state.threads[threadId]

    if (!thread.posts) {
      Vue.set(thread, 'posts', [])
    }

    Vue.set(thread.posts, postId, postId)
  },

  addPostToUser (state, { userId, postId }) {
    const user = state.users[userId]

    if (!user.posts) {
      Vue.set(user, 'posts', [])
    }

    Vue.set(user.posts, postId, postId)
  },

  addThreadToForum (state, { forumId, threadId }) {
    const forum = state.forums[forumId]

    if (!forum.threads) {
      Vue.set(forum, 'threads', [])
    }

    Vue.set(forum.threads, threadId, threadId)
  },

  addThreadToUser (state, { userId, threadId }) {
    const user = state.users[userId]

    if (!user.threads) {
      Vue.set(user, 'threads', [])
    }

    Vue.set(user.threads, threadId, threadId)
  },

  updateUser (state, { userId, user }) {
    const { users } = state

    Vue.set(users, userId, user)
  }
}

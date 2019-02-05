import Vue from 'vue'

export const mutations = {
  updateUser (state, { user, userId }) {
    const { sourceData } = state

    Vue.set(sourceData.users, userId, user)
  },

  addPost (state, { post, postId }) {
    const { sourceData } = state

    Vue.set(sourceData.posts, postId, post)
  },

  addPostToThread (state, { threadId, postId }) {
    const thread = state.sourceData.threads[threadId]

    Vue.set(thread.posts, postId, postId)
  },

  addPostToUser (state, { userId, postId }) {
    const user = state.sourceData.users[userId]

    Vue.set(user.posts, postId, postId)
  }
}

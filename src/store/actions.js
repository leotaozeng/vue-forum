export default {
  addPost ({ commit }, post) {
    const postId = post['.key']

    commit('addPost', { post, postId })
  },

  addPostToThread ({ commit }, post) {
    const postId = post['.key']
    const threadId = post.threadId

    commit('addPostToThread', { threadId, postId })
  },

  addPostToUser ({ commit }, post) {
    const postId = post['.key']
    const userId = post.userId

    commit('addPostToUser', { userId, postId })
  }
}

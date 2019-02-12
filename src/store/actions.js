export default {
  createPost ({ commit, state }, post) {
    return new Promise((resolve, reject) => {
      const postId = 'greatPost' + Math.random()

      post.publishedAt = Math.floor(Date.now() / 1000)
      post.userId = state.sourceData.authId
      post['.key'] = postId

      commit('setPost', { postId, post })
      commit('addPostToThread', { threadId: post.threadId, postId })
      commit('addPostToUser', { userId: post.userId, postId })

      resolve(state.sourceData.posts[postId])
    })
  },

  createThread ({ commit, state, dispatch }, { thread, text }) {
    return new Promise((resolve, reject) => {
      const threadId = 'greatThread' + Math.random()

      thread.publishedAt = Math.floor(Date.now() / 1000)
      thread.userId = state.sourceData.authId
      thread['.key'] = threadId

      commit('setThread', { threadId, thread })
      commit('addThreadToForum', { forumId: thread.forumId, threadId })
      commit('addThreadToUser', { userId: thread.userId, threadId })

      dispatch('createPost', { text, threadId }).then((post) => {
        commit('setThread', { threadId, thread: { ...thread, firstPostId: post['.key'] } })
      })

      resolve(state.sourceData.threads[threadId])
    })
  },

  updatePost ({ commit, state }, { id, text }) {
    return new Promise((resolve, reject) => {
      const post = state.sourceData.posts[id]

      post.text = text

      commit('setPost', { postId: id, post })

      resolve(state.sourceData.posts[id])
    })
  },

  updateThread ({ commit, state }, { id, title, text }) {
    return new Promise((resolve, reject) => {
      const thread = state.sourceData.threads[id]
      const firstPost = state.sourceData.posts[thread.firstPostId]

      thread.title = title
      firstPost.text = text

      commit('setThread', { threadId: id, thread })
      commit('setPost', { postId: firstPost['.key'], post: firstPost })

      resolve(state.sourceData.threads[id])
    })
  },

  updateUser ({ commit }, user) {
    const userId = user['.key']

    commit('updateUser', { userId, user })
  }
}

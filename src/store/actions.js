export default {
  createPost ({ commit, state }, { threadId, text }) {
    return new Promise((resolve, reject) => {
      const post = {}
      const postId = 'greatPost' + Math.random()

      post.publishedAt = Math.floor(Date.now() / 1000)
      post.text = text
      post.threadId = threadId
      post.userId = state.sourceData.authId
      post['.key'] = postId

      commit('setPost', { postId, post })
      commit('addPostToThread', { threadId: post.threadId, postId })
      commit('addPostToUser', { userId: post.userId, postId })

      resolve(state.sourceData.posts[postId])
    })
  },

  createThread ({ commit, state, dispatch }, { forumId, title, text }) {
    return new Promise((resolve, reject) => {
      const thread = {}
      const threadId = 'greatThread' + Math.random()

      thread.forumId = forumId
      thread.publishedAt = Math.floor(Date.now() / 1000)
      thread.title = title
      thread.userId = state.sourceData.authId
      thread['.key'] = threadId

      commit('setThread', { threadId, thread })
      commit('addThreadToForum', { forumId: thread.forumId, threadId })
      commit('addThreadToUser', { userId: thread.userId, threadId })

      dispatch('createPost', { threadId, text }).then((post) => {
        commit('setThread', { threadId, thread: { ...thread, firstPostId: post['.key'] } })
      })

      resolve(state.sourceData.threads[threadId])
    })
  },

  updatePost ({ commit, state }, { id, text }) {
    return new Promise((resolve, reject) => {
      const post = state.sourceData.posts[id]

      commit('setPost', { postId: id, post: { ...post, text } })

      console.log(post)

      resolve(state.sourceData.posts[id])
    })
  },

  updateThread ({ commit, state }, { id, title, text }) {
    return new Promise((resolve, reject) => {
      const thread = state.sourceData.threads[id]
      const firstPost = state.sourceData.posts[thread.firstPostId]

      commit('setThread', { threadId: id, thread: { ...thread, title } })
      commit('setPost', { postId: firstPost['.key'], post: { ...firstPost, text } })

      resolve(state.sourceData.threads[id])
    })
  },

  updateUser ({ commit }, user) {
    commit('updateUser', { userId: user['.key'], user })
  }
}

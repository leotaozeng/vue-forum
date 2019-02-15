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
      const { posts, authId } = state.sourceData

      const post = posts[id]
      const newPost = { ...post, text, edited: { at: Math.floor(Date.now() / 1000), by: authId } }

      commit('setPost', { postId: id, post: newPost })

      resolve(state.sourceData.posts[id])
    })
  },

  updateThread ({ commit, state, dispatch }, { id, title, text }) {
    return new Promise((resolve, reject) => {
      const { threads } = state.sourceData

      const thread = threads[id]
      const newThread = { ...thread, title }

      commit('setThread', { threadId: id, thread: newThread })

      // This is asynchronous
      dispatch('updatePost', { id: thread.firstPostId, text }).then((post) => {
        resolve(state.sourceData.threads[id])
      })
    })
  },

  updateUser ({ commit }, user) {
    commit('updateUser', { userId: user['.key'], user })
  }
}

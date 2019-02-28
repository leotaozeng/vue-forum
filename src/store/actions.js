export default {
  createPost ({ commit, state }, { threadId, text }) {
    return new Promise((resolve, reject) => {
      const post = {}
      const postId = 'greatPost' + Math.random()

      post.publishedAt = Math.floor(Date.now() / 1000)
      post.text = text
      post.threadId = threadId
      post.userId = state.authId
      post['.key'] = postId

      commit('setPost', { postId, post })
      commit('addPostToThread', { parentId: post.threadId, childId: postId })
      commit('addPostToUser', { parentId: post.userId, childId: postId })

      resolve(state.posts[postId])
    })
  },

  createThread ({ commit, state, dispatch }, { forumId, title, text }) {
    return new Promise((resolve, reject) => {
      const thread = {}
      const threadId = 'greatThread' + Math.random()

      thread.forumId = forumId
      thread.publishedAt = Math.floor(Date.now() / 1000)
      thread.title = title
      thread.userId = state.authId
      thread['.key'] = threadId

      commit('setThread', { threadId, thread })
      commit('addThreadToForum', { parentId: thread.forumId, childId: threadId })
      commit('addThreadToUser', { parentId: thread.userId, childId: threadId })

      dispatch('createPost', { threadId, text }).then((post) => {
        commit('setThread', { threadId, thread: { ...thread, firstPostId: post['.key'] } })
      })

      resolve(state.threads[threadId])
    })
  },

  updatePost ({ commit, state }, { id, text }) {
    return new Promise((resolve, reject) => {
      const { posts, authId } = state

      const post = posts[id]
      const newPost = { ...post, text, edited: { at: Math.floor(Date.now() / 1000), by: authId } }

      commit('setPost', { postId: id, post: newPost })

      resolve(state.posts[id])
    })
  },

  updateThread ({ commit, state, dispatch }, { id, title, text }) {
    return new Promise((resolve, reject) => {
      const { threads } = state

      const thread = threads[id]
      const newThread = { ...thread, title }

      commit('setThread', { threadId: id, thread: newThread })

      // This is asynchronous
      dispatch('updatePost', { id: thread.firstPostId, text }).then((post) => {
        resolve(state.threads[id])
      })
    })
  },

  updateUser ({ commit }, user) {
    commit('updateUser', { userId: user['.key'], user })
  }
}
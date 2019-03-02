import { database } from '../../firebase.config.js'

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

      commit('SET_POST', { postId, post })
      commit('ADD_POST_TO_THREAD', { parentId: post.threadId, childId: postId })
      commit('ADD_POST_TO_USER', { parentId: post.userId, childId: postId })

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

      commit('SET_THREAD', { threadId, thread })
      commit('ADD_THREAD_TO_FORUM', { parentId: thread.forumId, childId: threadId })
      commit('ADD_THREAD_T0_USER', { parentId: thread.userId, childId: threadId })

      dispatch('createPost', { threadId, text }).then((post) => {
        commit('SET_THREAD', { threadId, thread: { ...thread, firstPostId: post['.key'] } })
      })

      resolve(state.threads[threadId])
    })
  },

  updatePost ({ commit, state }, { id, text }) {
    return new Promise((resolve, reject) => {
      const { posts, authId } = state

      const post = posts[id]
      const newPost = { ...post, text, edited: { at: Math.floor(Date.now() / 1000), by: authId } }

      commit('SET_POST', { postId: id, post: newPost })

      resolve(state.posts[id])
    })
  },

  updateThread ({ commit, state, dispatch }, { id, title, text }) {
    return new Promise((resolve, reject) => {
      const { threads } = state

      const thread = threads[id]
      const newThread = { ...thread, title }

      commit('SET_POST', { threadId: id, thread: newThread })

      // This is asynchronous
      dispatch('updatePost', { id: thread.firstPostId, text }).then((post) => {
        resolve(state.threads[id])
      })
    })
  },

  updateUser ({ commit }, user) {
    commit('SET_USER', { userId: user['.key'], user })
  },

  fetchThread ({ dispatch }, { id }) {
    console.log('🔥 📋', id)
    return dispatch('fetchItem', { id, resource: 'threads' })
    // return new Promise((resolve, reject) => {
    //   database
    //     .ref('threads')
    //     .child(id)
    //     .once('value')
    //     .then(snapshot => {
    //       if (snapshot.val()) {
    //         const thread = snapshot.val()

    //         commit('SET_THREAD', {
    //           threadId: snapshot.key,
    //           thread: { ...thread, '.key': snapshot.key }
    //         })

    //         resolve(thread)
    //       }
    //     })
    // })
  },

  fetchUser ({ dispatch }, { id }) {
    console.log('🔥 📋', id)
    return dispatch('fetchItem', { id, resource: 'users' })
    // return new Promise((resolve, reject) => {
    //   database
    //     .ref('users')
    //     .child(id)
    //     .once('value')
    //     .then(snapshot => {
    //       if (snapshot.val()) {
    //         const user = snapshot.val()

    //         commit('SET_USER', {
    //           userId: snapshot.key,
    //           user: { ...user, '.key': snapshot.key }
    //         })

    //         resolve(user)
    //       }
    //     })
    // })
  },

  fetchPost ({ dispatch }, { id }) {
    console.log('🔥 📋', id)
    return dispatch('fetchItem', { id, resource: 'posts' })
    // return new Promise((resolve, reject) => {
    //   database
    //     .ref('posts')
    //     .child(id)
    //     .once('value')
    //     .then(snapshot => {
    //       if (snapshot.val()) {
    //         const post = snapshot.val()

    //         commit('SET_POST', {
    //           postId: snapshot.key,
    //           post: { ...post, '.key': snapshot.key }
    //         })

    //         resolve(post)
    //       }
    //     })
    // })
  },

  fetchItem ({ commit }, { id, resource }) {
    return new Promise((resolve, reject) => {
      database
        .ref(resource)
        .child(id)
        .once('value')
        .then(snapshot => {
          if (snapshot.val()) {
            const item = snapshot.val()

            commit('SET_ITEM', {
              resource,
              id: snapshot.key,
              item
            })

            resolve(item)
          }
        })
    })
  }
}

import { database } from '../../firebase.config.js'

export default {
  createPost: ({ commit, state }, { threadId, text }) =>
    new Promise((resolve, reject) => {
      const postId = database.ref('posts').push().key
      const post = {}

      post.publishedAt = Math.floor(Date.now() / 1000)
      post.text = text
      post.threadId = threadId
      post.userId = state.authId
      // The key cannot contain ., $, #, [, ], /,
      // post['.key'] = postId

      // Update right now
      var updates = {}
      updates[`/posts/${postId}`] = post
      updates[`/threads/${post.threadId}/posts/${postId}`] = postId
      updates[`/users/${post.userId}/posts/${postId}`] = postId

      database.ref().update(updates).then(() => {
        commit('SET_ITEM', { resource: 'posts', id: postId, item: post })
        commit('ADD_POST_TO_THREAD', { parentId: post.threadId, childId: postId })
        commit('ADD_POST_TO_USER', { parentId: post.userId, childId: postId })

        // Must get post from the state since the post I created doesn't contain the key property
        resolve(state.posts[postId])
      })
    }),

  createThread: ({ commit, state }, { forumId, title, text }) =>
    new Promise((resolve, reject) => {
      const threadId = database.ref('threads').push().key
      const postId = database.ref('posts').push().key
      const thread = {}
      const post = {}

      thread.contributors = state.authId
      thread.firstPostId = postId
      thread.forumId = forumId
      thread.lastPostId = postId

      thread.posts = {
        [postId]: postId
      }

      thread.publishedAt = Math.floor(Date.now() / 1000)
      thread.title = title
      thread.userId = state.authId

      post.publishedAt = Math.floor(Date.now() / 1000)
      post.text = text
      post.threadId = threadId
      post.userId = state.authId

      const updates = {}

      updates[`/threads/${threadId}`] = thread
      updates[`/forums/${thread.forumId}/threads/${threadId}`] = threadId
      updates[`/users/${thread.userId}/threads/${threadId}`] = threadId

      updates[`/posts/${postId}`] = post
      updates[`/users/${post.userId}/posts/${postId}`] = postId

      database.ref().update(updates).then(() => {
        // update post
        commit('SET_ITEM', { resource: 'threads', id: threadId, item: thread })
        commit('ADD_THREAD_TO_FORUM', { parentId: forumId, childId: threadId })
        commit('ADD_THREAD_T0_USER', { parentId: thread.userId, childId: threadId })
        // update thread
        commit('SET_ITEM', { resource: 'posts', id: postId, item: post })
        commit('ADD_POST_TO_THREAD', { parentId: threadId, childId: postId })
        commit('ADD_POST_TO_USER', { parentId: post.userId, childId: postId })

        resolve(state.threads[threadId])
      })
    }),

  updatePost: ({ commit, state }, { postId, text }) =>
    new Promise((resolve, reject) => {
      const { posts, authId } = state

      const edited = { at: Math.floor(Date.now() / 1000), by: authId }

      const post = posts[postId]
      const newPost = { ...post, text, edited }
      delete newPost['.key']

      const updates = {}
      updates[`/posts/${postId}`] = newPost
      database.ref().update(updates).then(() => {
        commit('SET_POST', { id: postId, item: newPost })

        resolve(state.posts[postId])
      })
    }),

  updateThread: ({ commit, state, dispatch }, { threadId, title, text }) =>
    new Promise((resolve, reject) => {
      const { threads, posts, authId } = state

      const thread = threads[threadId]
      const newThread = { ...thread, title }
      delete newThread['.key']

      const edited = { at: Math.floor(Date.now() / 1000), by: authId }

      const post = posts[thread.firstPostId]
      const newPost = { ...post, text, edited }
      delete newPost['.key']

      const updates = {}
      updates[`/threads/${threadId}`] = newThread
      updates[`/posts/${thread.firstPostId}`] = newPost

      database.ref().update(updates).then(() => {
        commit('SET_THREAD', { id: threadId, item: newThread })
        commit('SET_POST', { id: thread.firstPostId, item: newPost })

        resolve(state.threads[threadId])
      })
    }),

  updateUser: ({ commit }, user) => commit('SET_USER', { id: user['.key'], item: user }),

  fetchItem: ({ commit }, { id, resource }) =>
    new Promise((resolve, reject) =>
      database
        .ref(`${resource}/${id}`)
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
        })),

  fetchItems: ({ dispatch }, { ids, resource }) => Promise.all(Object.keys(ids).map(id => dispatch('fetchItem', { id, resource }))),

  fetchCategory: ({ dispatch }, { id }) => dispatch('fetchItem', { id, resource: 'categories' }),
  fetchForum: ({ dispatch }, { id }) => dispatch('fetchItem', { id, resource: 'forums' }),
  fetchThread: ({ dispatch }, { id }) => dispatch('fetchItem', { id, resource: 'threads' }),
  fetchPost: ({ dispatch }, { id }) => dispatch('fetchItem', { id, resource: 'posts' }),
  fetchUser: ({ dispatch }, { id }) => dispatch('fetchItem', { id, resource: 'users' }),

  fetchCategories: ({ dispatch }, { ids }) => dispatch('fetchItem', { ids, resource: 'categories' }),
  fetchForums: ({ dispatch }, { ids }) => dispatch('fetchItems', { ids, resource: 'forums' }),
  fetchThreads: ({ dispatch }, { ids }) => dispatch('fetchItems', { ids, resource: 'threads' }),
  fetchPosts: ({ dispatch }, { ids }) => dispatch('fetchItems', { ids, resource: 'posts' }),
  fetchUsers: ({ dispatch }, { ids }) => dispatch('fetchItem', { ids, resource: 'users' }),

  fetchAllCategories: ({ commit, state }) =>
    new Promise((resolve, reject) => {
      database
        .ref('categories')
        .once('value')
        .then(snapshot => {
          if (snapshot.val()) {
            // Each category doesn't have a key yet in categoriesObject
            // Use Object.values() should be later on
            const categoriesObject = snapshot.val()

            Object.keys(categoriesObject).forEach((categoryId) => {
              const category = categoriesObject[categoryId]

              commit('SET_ITEM', {
                resource: 'categories',
                id: categoryId,
                item: category
              })
            })

            resolve(Object.values(state.categories))
          }
        })
    })
}

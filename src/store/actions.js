import { database } from '../../firebase.config.js'
// import firebase from 'firebase'

// function writeNewPost (resource) {
//   // A post entry.
//   var postData = {
//     author: username,
//     uid: uid,
//     body: body,
//     title: title,
//     starCount: 0,
//     authorPic: picture
//   }

//   // Get a key for a new Post.
//   var newPostKey = database.ref(resource).push().key

//   // Write the new post's data simultaneously in the posts list and the user's post list.
//   var updates = {}
//   updates['/posts/' + newPostKey] = postData
//   updates['/user-posts/' + uid + '/' + newPostKey] = postData

//   return firebase.database().ref().update(updates)
// }

export default {
  createPost: ({ commit, state }, { threadId, text }) =>
    new Promise((resolve, reject) => {
      const post = {}
      const postId = database.ref('posts').push().key

      post.publishedAt = Math.floor(Date.now() / 1000)
      post.text = text
      post.threadId = threadId
      post.userId = state.authId
      post['.key'] = postId

      commit('SET_POST', { id: postId.key, item: post })
      commit('ADD_POST_TO_THREAD', { parentId: threadId, childId: postId })
      commit('ADD_POST_TO_USER', { parentId: post.userId, childId: postId })

      resolve(state.posts[postId])
    }),

  createThread: ({ commit, state, dispatch }, { forumId, title, text }) =>
    new Promise((resolve, reject) => {
      const thread = {}
      const threadId = 'greatThread' + Math.random()

      thread.forumId = forumId
      thread.publishedAt = Math.floor(Date.now() / 1000)
      thread.title = title
      thread.userId = state.authId
      thread['.key'] = threadId

      commit('SET_THREAD', { id: threadId, item: thread })
      commit('ADD_THREAD_TO_FORUM', { parentId: forumId, childId: threadId })
      commit('ADD_THREAD_T0_USER', { parentId: thread.userId, childId: threadId })

      dispatch('createPost', { threadId, text }).then((post) => {
        commit('SET_THREAD', { id: threadId, item: { ...thread, firstPostId: post['.key'] } })
      })

      resolve(state.threads[threadId])
    }),

  updatePost: ({ commit, state }, { id, text }) =>
    new Promise((resolve, reject) => {
      const { posts, authId } = state

      const post = posts[id]
      const newPost = { ...post, text, edited: { at: Math.floor(Date.now() / 1000), by: authId } }

      commit('SET_POST', { id, item: newPost })

      resolve(state.posts[id])
    }),

  updateThread: ({ commit, state, dispatch }, { id, title, text }) =>
    new Promise((resolve, reject) => {
      const { threads } = state

      const thread = threads[id]
      const newThread = { ...thread, title }

      commit('SET_POST', { id, item: newThread })

      // This is asynchronous
      dispatch('updatePost', { id: thread.firstPostId, text }).then((post) => {
        resolve(state.threads[id])
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

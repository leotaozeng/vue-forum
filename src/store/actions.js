import { auth, database, GoogleAuthProvider } from '../../firebase.config.js'

export default {
  createThread: ({ commit, state }, { forumId, title, text }) =>
    new Promise((resolve, reject) => {
      const threadId = database.ref().child('threads').push().key
      const postId = database.ref().child('posts').push().key
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

      var updates = {}
      updates[`/threads/${threadId}`] = thread
      updates[`/forums/${thread.forumId}/threads/${threadId}`] = threadId
      updates[`/users/${thread.userId}/threads/${threadId}`] = threadId

      updates[`/posts/${postId}`] = post
      updates[`/users/${post.userId}/posts/${postId}`] = postId

      database.ref().update(updates).then(() => {
        // Update post.
        commit('SET_ITEM', { resource: 'threads', id: threadId, item: thread })
        commit('ADD_THREAD_TO_FORUM', { parentId: forumId, childId: threadId })
        commit('ADD_THREAD_T0_USER', { parentId: thread.userId, childId: threadId })

        // Update thread.
        commit('SET_ITEM', { resource: 'posts', id: postId, item: post })
        commit('ADD_POST_TO_THREAD', { parentId: threadId, childId: postId })
        commit('ADD_POST_TO_USER', { parentId: post.userId, childId: postId })

        resolve(state.threads[threadId])
      })
    }),

  createPost: ({ commit, state }, { threadId, text }) =>
    new Promise((resolve, reject) => {
      // Get a key for a new Post.
      const postId = database.ref().child('posts').push().key
      const post = {}

      post.publishedAt = Math.floor(Date.now() / 1000)
      post.text = text
      post.threadId = threadId
      post.userId = state.authId
      // The key can't contain ., $, #, [, ], /.
      // post['.key'] = postId

      // Update right now.
      var updates = {}
      updates[`/posts/${postId}`] = post
      updates[`/threads/${post.threadId}/posts/${postId}`] = postId
      updates[`/threads/${post.threadId}/contributors/${post.userId}`] = post.userId
      updates[`/users/${post.userId}/posts/${postId}`] = postId

      // The firebase update is asynchronous.
      database.ref().update(updates).then(() => {
        // Add the .key again.
        commit('SET_ITEM', { resource: 'posts', id: postId, item: post })
        commit('ADD_CONTRIBUTOR_TO_THREAD', { parentId: post.threadId, childId: post.userId })
        commit('ADD_POST_TO_THREAD', { parentId: post.threadId, childId: postId })
        commit('ADD_POST_TO_USER', { parentId: post.userId, childId: postId })

        // Must get post from the state since the post I created doesn't contain the key property.
        resolve(state.posts[postId])
      })
    }),

  createUser: ({ commit, state }, { id, email, name, username, avatar = null }) =>
    new Promise((resolve, reject) => {
      const user = {}
      const registeredAt = Math.floor(Date.now() / 1000)

      user.avatar = avatar
      user.email = email.toLowerCase()
      user.name = name
      user.registeredAt = registeredAt
      user.username = username
      user.usernameLower = username.toLowerCase()

      database.ref('users').child(id).set(user).then(() => {
        commit('SET_ITEM', { resource: 'users', id, item: user })

        resolve(state.users[id])
      })
    }),

  signUpUserWithEmailAndPassword (context, { email, password }) {
    return auth.createUserWithEmailAndPassword(email, password)
  },

  signInWithEmailAndPassword (context, { email, password }) {
    return auth.signInWithEmailAndPassword(email, password)
  },

  signInWithGoogle ({ dispatch }) {
    // To sign in with a pop-up window.
    return auth.signInWithPopup(GoogleAuthProvider).then(result => {
      // The signed-in user info.
      const { uid, email, displayName, photoURL } = result.user

      database.ref('users').child(uid).once('value').then(snapshot => {
        if (!snapshot.exists()) {
          dispatch('createUser', { email, id: uid, name: displayName, username: email, avatar: photoURL })
            .then(() => dispatch('fetchAuthUser', { id: uid }))
        }
      })
    })
  },

  signOut ({ commit }) {
    return auth.signOut().then(() => commit('SET_AUTH_USER', null))
  },

  updateThread: ({ commit, state, dispatch }, { threadId, title, text }) =>
    new Promise((resolve, reject) => {
      const { threads, posts, authId } = state
      const thread = threads[threadId]
      const post = posts[thread.firstPostId]

      const edited = { at: Math.floor(Date.now() / 1000), by: authId }

      const updates = {}
      updates[`/threads/${threadId}/title`] = title
      updates[`/posts/${thread.firstPostId}/edited`] = edited
      updates[`/posts/${thread.firstPostId}/text`] = text

      database.ref().update(updates).then(() => {
        commit('SET_THREAD', { id: threadId, item: { ...thread, title } })
        commit('SET_POST', { id: thread.firstPostId, item: { ...post, text, edited } })

        resolve(state.threads[threadId])
      })
    }),

  updatePost: ({ commit, state }, { postId, text }) =>
    new Promise((resolve, reject) => {
      const { posts, authId } = state
      const post = posts[postId]

      const edited = { at: Math.floor(Date.now() / 1000), by: authId }

      const updates = {}
      updates[`/posts/${postId}/edited`] = edited
      updates[`/posts/${postId}/text`] = text

      database.ref().update(updates).then(() => {
        commit('SET_POST', { resource: 'posts', id: postId, item: { ...post, text, edited } })

        resolve(state.posts[postId])
      })
    }),

  updateUser: ({ commit }, user) => commit('SET_USER', { id: user['.key'], item: user }),

  fetchItem: ({ state, commit }, { id, resource }) =>
    new Promise((resolve, reject) =>
      database
        .ref(`${resource}/${id}`)
        .once('value')
        .then(snapshot => {
          const item = snapshot.val()

          if (item) {
            commit('SET_ITEM', {
              resource,
              id: snapshot.key,
              item
            })
          }

          resolve(state[resource][id])
        })),

  // Each fetchItem call retuens a promise.
  fetchItems: ({ dispatch }, { ids, resource }) => {
    ids = Array.isArray(ids) ? ids : Object.keys(ids)

    return Promise.all(ids.map(id => dispatch('fetchItem', { id, resource })))
  },

  fetchAuthUser: ({ dispatch, commit }, { id }) => {
    database.ref('users').child(id).once('value').then(snapshot => {
      if (snapshot.exists()) {
        dispatch({ type: 'fetchUser', id }).then(() => commit('SET_AUTH_USER', id))
      }
    })
  },

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

            // forEach returns the value undefined and is not chainable
            Object.keys(categoriesObject).forEach((id) => {
              const category = categoriesObject[id]

              commit('SET_ITEM', {
                resource: 'categories',
                item: category,
                id
              })
            })
          }

          resolve(Object.values(state.categories))
        })
    }),

  fetchCategory: ({ dispatch }, { id }) => dispatch('fetchItem', { id, resource: 'categories' }),
  fetchForum: ({ dispatch }, { id }) => dispatch('fetchItem', { id, resource: 'forums' }),
  fetchThread: ({ dispatch }, { id }) => dispatch('fetchItem', { id, resource: 'threads' }),
  fetchPost: ({ dispatch }, { id }) => dispatch('fetchItem', { id, resource: 'posts' }),
  fetchUser: ({ dispatch }, { id }) => dispatch('fetchItem', { id, resource: 'users' }),

  fetchCategories: ({ dispatch }, { ids }) => dispatch('fetchItems', { ids, resource: 'categories' }),
  fetchForums: ({ dispatch }, { ids }) => dispatch('fetchItems', { ids, resource: 'forums' }),
  fetchThreads: ({ dispatch }, { ids }) => dispatch('fetchItems', { ids, resource: 'threads' }),
  fetchPosts: ({ dispatch }, { ids }) => dispatch('fetchItems', { ids, resource: 'posts' }),
  fetchUsers: ({ dispatch }, { ids }) => dispatch('fetchItems', { ids, resource: 'users' })
}

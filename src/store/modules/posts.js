import {
  database
} from '@/firebase.config'
import {
  SET_POST
} from '../mutation-types'
import {
  makeSetItemMutation
} from '../assetHelpers'

export default {
  namespaced: true,

  state: {
    items: {} // store.state.categories.items[id]
  },

  getters: {
    posts: (state) => ({ resourceId, id }) => Object.values(state.items).filter(post => post[resourceId] === id)
  },

  mutations: {
    [SET_POST]: makeSetItemMutation()
  },

  actions: {
    createPost: ({ commit, state, rootState }, { threadId, text }) =>
      new Promise((resolve, reject) => {
        // Get a key for a new Post.
        const postId = database.ref().child('posts').push().key
        const post = {}

        post.publishedAt = Math.floor(Date.now() / 1000)
        post.text = text
        post.threadId = threadId
        post.userId = rootState.auth.authId
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
          commit('SET_ITEM', {
            resource: 'posts',
            id: postId,
            item: post
          }, {
            root: true
          })
          commit('threads/ADD_CONTRIBUTOR_TO_THREAD', {
            parentId: post.threadId,
            childId: post.userId
          }, {
            root: true
          })
          commit('threads/ADD_POST_TO_THREAD', {
            parentId: post.threadId,
            childId: postId
          }, {
            root: true
          })
          commit('users/ADD_POST_TO_USER', {
            parentId: post.userId,
            childId: postId
          }, {
            root: true
          })

          // Must get post from the state since the post I created doesn't contain the key property.
          resolve(state.items[postId])
        })
      }),

    updatePost: ({ state, commit, rootState }, { postId, text }) =>
      new Promise((resolve, reject) => {
        const post = state.items[postId]

        const edited = {
          at: Math.floor(Date.now() / 1000),
          by: rootState.auth.authId
        }

        const updates = {}
        updates[`/posts/${postId}/edited`] = edited
        updates[`/posts/${postId}/text`] = text

        database.ref().update(updates).then(() => {
          commit('SET_POST', {
            resource: 'posts',
            id: postId,
            item: {
              ...post,
              text,
              edited
            }
          })

          resolve(state.items[postId])
        })
      }),

    fetchPost: ({ dispatch }, { id }) => dispatch('fetchItem', { id, resource: 'posts' }, { root: true }),

    fetchPosts: ({ dispatch }, { ids }) => dispatch('fetchItems', { ids, resource: 'posts' }, { root: true })
  }
}

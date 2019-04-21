import { database } from '@/firebase.config'
import { SET_USER, ADD_POST_TO_USER, ADD_THREAD_T0_USER } from '../mutation-types'
import { makeSetItemMutation, makeAppendChildToParentMutation, countObjectProperties, removeEmptyProperties } from '../assetHelpers'

export default {
  namespaced: true,

  state: {
    items: {} // store.state.categories.items[id]
  },

  mutations: {
    [SET_USER]: makeSetItemMutation({ resource: 'users' }),

    [ADD_POST_TO_USER]: makeAppendChildToParentMutation({ parent: 'users', child: 'posts' }),

    [ADD_THREAD_T0_USER]: makeAppendChildToParentMutation({ parent: 'users', child: 'threads' })
  },

  actions: {
    fetchUser: ({ dispatch }, { id }) => dispatch('fetchItem', { id, resource: 'users' }, { root: true }),

    fetchUsers: ({ dispatch }, { ids }) => dispatch('fetchItems', { ids, resource: 'users' }, { root: true }),

    createUser: ({ state, commit, rootState }, { id, email, name, username, avatar = null }) =>
      new Promise((resolve, reject) => {
        const user = {}
        const registeredAt = Math.floor(Date.now() / 1000)

        user.avatar = avatar
        user.email = email.toLowerCase()
        user.name = name
        user.registeredAt = registeredAt
        user.username = username
        user.usernameLower = username.toLowerCase()

        database.ref(`users/${id}`).set(user).then(() => {
          commit('SET_ITEM', { resource: 'users', id, item: user }, { root: true })

          resolve(state.items[id])
        })
      }),

    updateUser: ({ commit }, user) =>
      new Promise((resolve, reject) => {
        const userData = {
          avatar: user.avatar,
          bio: user.bio,
          email: user.email,
          name: user.name,
          posts: user.posts,
          threads: user.threads,
          username: user.username,
          usernameLower: user.username.toLowerCase(),
          website: user.webiste,
          location: user.location
        }

        database.ref(`users/${user['.key']}`).set(removeEmptyProperties(userData), (error) => {
          if (error) {
            // The write failed...
            reject(error)
          } else {
            // Data saved successfully!
            console.log('Set successfully')
            resolve()
          }
        })
      })
  },

  getters: {
    // we can't pass arguments to getters by default
    // dynamic getter
    userThreadsCount: state => {
      return id => countObjectProperties(state.items[id].threads)
    },

    userPostsCount: state => {
      return id => countObjectProperties(state.items[id].posts)
    }
  }
}

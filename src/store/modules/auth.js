import { auth, GoogleAuthProvider, database } from '@/firebase.config'
import { SET_AUTH_USER, SET_UNSUBSCRIBE_AUTH_OBSERVE } from '../mutation-types'

export default {
  namespaced: true,

  state: {
    authId: null,
    unsubscribeAuthObserver: null
  },

  getters: {
    authUser: (state, getters, rootState) => {
      return state.authId ? rootState.users.items[state.authId] : null
    }
  },

  mutations: {
    [SET_AUTH_USER] (state, id) {
      state.authId = id
    },

    [SET_UNSUBSCRIBE_AUTH_OBSERVE] (state, unsubscribe) {
      state.unsubscribeAuthObserver = unsubscribe
    }
  },

  actions: {
    fetchAuthUser: ({ dispatch, commit }, { id }) => {
      return new Promise((resolve, reject) => {
        // Here is asynchronous so it might take some time to resolve
        database.ref(`users/${id}`).once('value').then(snapshot => {
          if (snapshot.exists()) {
          // store authenticated user's information in the vuex and then set authId
            dispatch('users/fetchUser', { id }, { root: true }).then(() => {
              commit('SET_AUTH_USER', id)
              resolve(snapshot.val())
            })
          }
        })
      })
    },

    initAuthentication ({ dispatch, commit }) {
      return new Promise((resolve, reject) => {
        const unsubscrive = auth.onAuthStateChanged((user) => {
          if (user) {
            console.log(1)
            dispatch('fetchAuthUser', { id: user.uid }).then((dbUser) => resolve(dbUser))
          } else {
            resolve(null)
          }
        })
        commit('SET_UNSUBSCRIBE_AUTH_OBSERVE', unsubscrive)
      })
    },

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
            dispatch('users/createUser', { email, id: uid, name: displayName, username: email, avatar: photoURL }, { root: true })
              .then(() => dispatch('fetchAuthUser', { id: uid }))
          }
        })
      })
    },

    logout ({ dispatch, commit }) {
      return new Promise((resolve, reject) =>
        auth.signOut().then(() => {
          commit('SET_AUTH_USER', null)
          resolve()
        })
      )
    }
  }
}

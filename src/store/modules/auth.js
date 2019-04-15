import { auth, GoogleAuthProvider, database } from '@/firebase.config'
import { SET_AUTH_USER } from '../mutation-types'

export default {
  namespaced: true,

  state: {
    authId: null
  },

  getters: {
    authUser: (state, getters, rootState) => {
      return state.authId ? rootState.users.items[state.authId] : null
    }
  },

  mutations: {
    [SET_AUTH_USER] (state, id) {
      state.authId = id
    }
  },

  actions: {
    signUpUserWithEmailAndPassword (context, { email, password }) {
      return auth.createUserWithEmailAndPassword(email, password)
    },

    signInWithEmailAndPassword (context, { email, password }) {
      return auth.signInWithEmailAndPassword(email, password)
    },

    signInWithGoogle ({ dispatch }) {
      // To sign in with a pop-up window.
      return auth.signInWithRedirect(GoogleAuthProvider).getRedirectResult().then(result => {
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

    initAuthentication ({ dispatch }) {
      return new Promise((resolve, reject) => {
        auth.onAuthStateChanged((user) => {
          if (user) {
            dispatch('fetchAuthUser', { id: user.uid })
          }
          // } else {
          //   store.dispatch({ type: 'fetchUser', id: store.state.authId })
          // }
          resolve(user)
        })
      })
    },

    logout ({ commit }) {
      return new Promise((resolve, reject) =>
        auth.signOut().then(() => {
          commit('SET_AUTH_USER', null)
          resolve()
        }).catch((error) => reject(error))
      )
    },

    fetchAuthUser: ({ dispatch, commit }, { id }) => {
      database.ref('users').child(id).once('value').then(snapshot => {
        if (snapshot.exists()) {
          dispatch({ type: 'fetchUser', id }).then(() => commit('SET_AUTH_USER', id))
        }
      })
    }
  }
}

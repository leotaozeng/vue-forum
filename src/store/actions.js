import { database } from '../firebase.config.js'

export default {
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

          resolve(state[resource]['items'][id])
        })),

  // Each fetchItem call retuens a promise.
  fetchItems: ({ dispatch }, { ids, resource }) => {
    ids = Array.isArray(ids) ? ids : Object.keys(ids)

    return Promise.all(ids.map(id => dispatch('fetchItem', { id, resource }, { root: true })))
  }
}

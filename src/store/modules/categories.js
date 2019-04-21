import { database } from '@/firebase.config'

export default {
  namespaced: true,

  state: {
    items: {} // store.state.categories.items[id]
  },

  actions: {
    fetchAllCategories: ({ state, commit }) =>
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
                }, { root: true })
              })
            }

            resolve(Object.values(state.items))
          })
      }),

    fetchCategory: ({ dispatch }, { id }) => dispatch('fetchItem', { id, resource: 'categories' }, { root: true }),

    fetchCategories: ({ dispatch }, { ids }) => dispatch('fetchItems', { ids, resource: 'categories' }, { root: true })
  },

  getters: {}
}

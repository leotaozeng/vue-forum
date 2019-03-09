import Vue from 'vue'
// import firebase from 'firebase'

export const countObjectProperties = obj => {
  if (typeof obj === 'object') {
    return Object.keys(obj).length
  } else {
    return 0
  }
}

export const makeAppendChildToParentMutation = ({ parent, child }) =>
  (state, { parentId, childId }) => {
    console.log(parent, parentId)
    // cannot use a variable after the dot
    let resource = state[parent][parentId] // user.name === user['name']

    if (!resource[child]) {
      console.log(1)
      Vue.set(resource, child, [])
    }

    Vue.set(resource[child], childId, childId)
  }

export const makeSetItemMutation = ({ resource }) => (state, { id, item }) => {
  Vue.set(state[resource], id, item)
}

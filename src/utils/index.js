import Vue from 'vue'

export const countObjectProperties = obj => {
  if (typeof obj === 'object') {
    return Object.keys(obj).length
  } else {
    return 0
  }
}

export const makeAppendChildToParentMutation = ({ parent, child }) => {
  return (state, { parentId, childId }) => {
    // cannot use a variable after the dot
    const resource = state[parent][parentId] // user.name === user['name']

    if (!resource[child]) {
      Vue.set(resource, child, [])
    }

    Vue.set(resource[child], childId, childId)
  }
}

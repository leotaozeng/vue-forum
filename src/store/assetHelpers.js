import Vue from 'vue'

// higher order function
const makeSetItemMutation = () => {
  return (state, { id, item }) => Vue.set(state.items, id, item)
}

const makeAppendChildToParentMutation = ({ parent, child }) => {
  return (state, { parentId, childId }) => {
    // Can't use a variable after the dot.
    // Find the parent resource in the state.
    var resource = state.items[parentId] // user.name === user['name']

    if (!resource[child]) {
      Vue.set(resource, child, [])
    }

    Vue.set(resource[child], childId, childId)
  }
}

const countObjectProperties = obj => {
  if (typeof obj === 'object') {
    return Object.keys(obj).length
  } else {
    return 0
  }
}

const removeEmptyProperties = obj => {
  const objCopy = { ...obj }

  Object.keys(objCopy).forEach((key) => {
    ((objCopy[key] === undefined || objCopy[key] === null) && delete objCopy[key])
  })

  return objCopy
}

export { makeSetItemMutation, makeAppendChildToParentMutation, countObjectProperties, removeEmptyProperties }

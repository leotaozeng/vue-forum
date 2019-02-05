export const countObjectProperties = obj => {
  if (typeof obj === 'object') {
    return Object.keys(obj).length
  } else {
    return 0
  }
}

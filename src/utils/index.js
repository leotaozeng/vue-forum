const countObjectProperties = obj =>
  typeof obj === 'object' ? Object.keys(obj).length : 0

export { countObjectProperties }

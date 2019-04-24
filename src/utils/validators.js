import { database } from '@/firebase.config.js'

const uniqueUsername = (value) => {
  // simulate async call, fail for all logins with even length
  return new Promise((resolve, reject) => {
    database
      .ref('users')
      .orderByChild('usernameLower')
      .equalTo(value.toLowerCase())
      .once('value', snapshot => resolve(!snapshot.exists()))
  })
}

const uniqueEmail = (value) => {
  // simulate async call, fail for all logins with even length
  return new Promise((resolve, reject) => {
    database
      .ref('users')
      .orderByChild('email')
      .equalTo(value.toLowerCase())
      .once('value', snapshot => resolve(!snapshot.exists()))
  })
}

const supportedImageFile = (value) => {
  const supported = ['jpg', 'jpeg', 'gif', 'png', 'svg']
  const suffix = value.split('.').pop()

  return supported.includes(suffix)
}

const responseOk = (value) => {
  return new Promise((resolve, reject) => {
    fetch(value)
      .then(res => {
        console.log(res)
        resolve(res.ok)
      })
      // The thing with fetch is that it won't reject if the URL is not found.
      .catch(() => resolve(false))
  })
}

export { uniqueUsername, uniqueEmail, supportedImageFile, responseOk }

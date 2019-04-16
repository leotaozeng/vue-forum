import firebase from 'firebase'

// Initialize Firebase.
const config = {
  apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
  authDomain: process.env.VUE_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.VUE_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.VUE_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VUE_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VUE_APP_FIREBASE_MESSAGING_SENDER_ID
}
const app = firebase.initializeApp(config)

const auth = app.auth()
const database = app.database()

const GoogleAuthProvider = new firebase.auth.GoogleAuthProvider()

export { auth, database, GoogleAuthProvider }

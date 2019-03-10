import firebase from 'firebase'
import 'firebase/database'

// Initialize Firebase
const config = {
  apiKey: 'AIzaSyAaQR4LmN8jWEgLpYl8L3GpiACkkVH_Sfg',
  authDomain: 'vue-forum-dc79e.firebaseapp.com',
  databaseURL: 'https://vue-forum-dc79e.firebaseio.com',
  projectId: 'vue-forum-dc79e',
  storageBucket: 'vue-forum-dc79e.appspot.com',
  messagingSenderId: '619851662792'
}
const defaultApp = firebase.initializeApp(config)

// Get a reference to the database service
const database = defaultApp.database()

export { database }

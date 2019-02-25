import firebase from 'firebase'

// Initialize Firebase
const config = {
  apiKey: 'AIzaSyAaQR4LmN8jWEgLpYl8L3GpiACkkVH_Sfg',
  authDomain: 'vue-forum-dc79e.firebaseapp.com',
  databaseURL: 'https://vue-forum-dc79e.firebaseio.com',
  projectId: 'vue-forum-dc79e',
  storageBucket: 'vue-forum-dc79e.appspot.com',
  messagingSenderId: '619851662792'
}

let firebaseChat = firebase.initializeApp(config)

// Instancia do firebase
let db = firebaseChat.database()

export default db

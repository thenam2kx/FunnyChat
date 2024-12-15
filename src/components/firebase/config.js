import firebase from 'firebase/app'
import 'firebase/analytics'
import 'firebase/auth'
import 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyBvhmOYtjqWxQ_Kxxe7uRQ_r0XlfFdpniE",
  authDomain: "funny-chat-3aa3d.firebaseapp.com",
  projectId: "funny-chat-3aa3d",
  storageBucket: "funny-chat-3aa3d.firebasestorage.app",
  messagingSenderId: "533452835209",
  appId: "1:533452835209:web:d5fc0eac71ea6aff0b7958",
  measurementId: "G-3J579J1E1B"
};

firebase.initializeApp(firebaseConfig);
firebase.analytics()

const auth = firebase.auth()
const db = firebase.firestore()

// auth.useEmulator('http://localhost:9099')
if (window.location.hostname === 'localhost') {
  // db.useEmulator('localhost', '8080')
}

export { auth, db }
export default firebase
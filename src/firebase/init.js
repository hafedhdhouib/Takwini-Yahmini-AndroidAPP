/* eslint-disable */
import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/storage'
import 'firebase/auth'
const firebaseConfig = {
  apiKey: process.env.AIPKEY,
  authDomain: process.env.AUTHDOMAIN,
  projectId:process.env.PROJECTID,
  storageBucket: process.env.STORAGEBUCKET,
  messagingSenderId: process.env.MESSAGINGSENDERID,
  appId: process.env.APPID,
  measurementId: process.env.MEASUREMENTID
}
// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig)
const timestamp = firebase.firestore.FieldValue.serverTimestamp
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    // const uid = user.uid
    console.log('User is signed in')
    console.log(user)
  } else {
    // User is signed out
    console.log('User is signed out')
  }
})
firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
export { timestamp }
export default firebaseApp.firestore()

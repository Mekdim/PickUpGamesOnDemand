import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
// Mark: get these values as  environment variables
const app = firebase.initializeApp({
    apiKey: "AIzaSyArD4u-vU1rhcix6wHzwr38m1hn_AIguqI",
    authDomain: "kuas-cd526.firebaseapp.com",
    projectId: "kuas-cd526",
    storageBucket: "kuas-cd526.appspot.com",
    messagingSenderId: "715463083257",
    appId: "1:715463083257:web:a6f09254e37848fa890e28"
})
export const auth = app.auth()


export default app
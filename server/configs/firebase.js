// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getStorage } from 'firebase/storage'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDXeYYNJ_n-Ox7CD1M5BBYvIxhA12Im4JU",
  authDomain: "foody-final-project-1b3b4.firebaseapp.com",
  projectId: "foody-final-project-1b3b4",
  storageBucket: "foody-final-project-1b3b4.appspot.com",
  messagingSenderId: "877504602949",
  appId: "1:877504602949:web:69064e814e7171ba65942c"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

export const fileStorage = getStorage(app)

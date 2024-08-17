// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getStorage } from 'firebase/storage'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAKOwmcCmm6K3q7XYNqbs4WGrsVKpyUFhs',
  authDomain: 'foody-e0737.firebaseapp.com',
  projectId: 'foody-e0737',
  storageBucket: 'foody-e0737.appspot.com',
  messagingSenderId: '1060733084509',
  appId: '1:1060733084509:web:24f1f0a4921fbacc157eb4',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

export const fileStorage = getStorage(app)

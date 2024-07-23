// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getStorage } from 'firebase/storage'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyD9V249daB0aLXq9qACaJ9mLW_PtjPsqVo',
  authDomain: 'foody-delivery-1f46e.firebaseapp.com',
  projectId: 'foody-delivery-1f46e',
  storageBucket: 'foody-delivery-1f46e.appspot.com',
  messagingSenderId: '1037363088417',
  appId: '1:1037363088417:web:5d1235979fb62a8c2fa760',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

export const fileStorage = getStorage(app)

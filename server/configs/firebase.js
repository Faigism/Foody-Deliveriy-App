// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getStorage } from 'firebase/storage'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyA2qvNWbOcZqBFovmUiVJE6XJSBkP6BFJg',
  authDomain: 'foody-app-af377.firebaseapp.com',
  projectId: 'foody-app-af377',
  storageBucket: 'foody-app-af377.appspot.com',
  messagingSenderId: '511670677802',
  appId: '1:511670677802:web:2178ec88b55e2d7f2d2e53',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

export const fileStorage = getStorage(app)

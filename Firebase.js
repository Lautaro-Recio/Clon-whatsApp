// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from "firebase/firestore"
import { getAuth, GoogleAuthProvider } from "firebase/auth"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBfgoJLCp-naPnn4A-pfeWLYSwg5HPm9XY",
  authDomain: "chat-4dd72.firebaseapp.com",
  projectId: "chat-4dd72",
  storageBucket: "chat-4dd72.appspot.com",
  messagingSenderId: "808168555035",
  appId: "1:808168555035:web:e92556d6000912cbe7aebe"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app)
export const auth = getAuth()
auth.useDeviceLanguage()
export const googleProvider = new GoogleAuthProvider()
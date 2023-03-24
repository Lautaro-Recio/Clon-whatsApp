import React from 'react'
import google from "../../assets/imgs/google.png"
import { signInWithPopup } from "firebase/auth"
import { auth, db, googleProvider } from "../../../Firebase.js"
import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore'
export default function SignIn({setUserTrue}) {
    const SignWhitGoogle = () =>{
        signInWithPopup(auth,googleProvider)
        const {uid, photoURL, displayName, email } = auth.currentUser

        
        getDoc(doc(db, "messages", email)).then(docSnap => {
            if (!docSnap.exists()) {
                setDoc(doc(db, "messages",email), {
                createdAt: serverTimestamp(),
                uid,
                photoURL,
                displayName,
                email,
                chats:[],
                online:true
            })
            }
          })
        .then(doc =>{
            setUserTrue()
        })
        .catch(error =>{
            console.log(error)
        })
    }

  return (
    <button className='flex justify-center space-x-2 items-center w-60 h-10 bg-[#695a79a6]  border-2 border-white rounded-lg' onClick={SignWhitGoogle}>
        <img className='w-6 h-6 ' src={google} alt="Google icon" />
        <p className='text-white'>SigIn Whit Google</p>
    </button>
  )
}

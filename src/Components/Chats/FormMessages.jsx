import { arrayUnion, doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import React, { useState } from 'react'
import { db } from '../../../Firebase';

export default function FormMessages(props) {
    const [messageSended, setMessagesended] = useState("")
    const disp = window.screen.width
const sendMessage = async (e) =>{
    e.preventDefault()
    const myRef = doc(db, "messages",props.email, "chats",props.Authors);
    const fecha = new Date().getTime()
    const hours = new Date().getHours()
    const minutes = new Date().getMinutes()
    

      await getDoc(myRef).then(docSnap=>{
        if (docSnap.exists()) {
          updateDoc(myRef, {
            messagesArray: arrayUnion({
              messageSended,
              createdAt:fecha,
              autorOfmessage:props.email,
              hours,
              minutes
            })         
          });
        } else {
          setDoc(myRef,{messagesArray:[]})
          updateDoc(myRef, {
            messagesArray: arrayUnion({
              messageSended,
              createdAt:fecha,
              autorOfmessage:props.email,
              hours,
              minutes
            })
          });
        }
      })
      setMessagesended("")
    
    }

    return (
    <>
        { props.Authors && (
            <form onSubmit={sendMessage} className="flex place-content-between sticky w-full bottom-0">
                <input maxLength={30} className='w-full border-2 border-gray-400 ' value={messageSended} onChange={(e)=>{setMessagesended(e.target.value)}} type="text" placeholder="Caracteres disponible 30" />
                <button className='bg-green-400 px-4 py-2' type='submit' disabled={!messageSended}>Enviar</button>
            </form>
        )}
    </>
  )
}

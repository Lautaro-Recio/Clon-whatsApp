import { async } from '@firebase/util'
import { collection, onSnapshot, orderBy, limit, addDoc, serverTimestamp, query, doc, updateDoc, arrayUnion, getDoc, where, getDocs, setDoc} from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { auth, db } from '../../../Firebase'
import Online from '../Online/Online'
import SignOut from '../SignWhitGoogle/SignOut'
import User from '../UserContainer/User'
import ChatMessages from './ChatMessages'

export default function Chats({setUser}) {
  const [messages, setMessages] = useState([])
  const [users, setUsers] = useState([])
  const [messageSended, setMessagesended] = useState("")
  const {email} = auth.currentUser
  const [Authors, setAuthors] = useState("")
  console.log(messages)

  const renderMessages = async (emailOfUser) =>{
    const allMessages = []        
    const Myq = query(collection(db, "messages", email,"chats"));
    onSnapshot(Myq, (snapshot) => {
      snapshot.forEach((change) => {
        if (change.id === emailOfUser ){
          change.data().messagesArray.forEach(element => {
            allMessages.push(element)
          }); 

        }
      });
    });   
    const UserQ = query(collection(db, "messages",emailOfUser,"chats"));
    onSnapshot(UserQ, (snapshot) => {
      console.log("cambio de base")
      snapshot.forEach((change) => {
        if (change.id === email){
          change.data().messagesArray.forEach(element => {
            allMessages.push(element)
          }); 
        }
        allMessages.sort((a,b) =>{
            if(a.createdAt < b.createdAt){
                return -1
            }else{
                return 1
            }
        })
        setMessages(allMessages)
      });
    }); 
  }

  const setAuthorsName = async (displayName)=>{
    setAuthors(displayName)
    renderMessages(displayName)

  }

  

  useEffect(()=>{
    
    const q = query(collection(db,"messages"), orderBy("createdAt"), limit(100))
      const unsuscribe = onSnapshot(q,(querySnapshot)=>{
      const usersArray = []
      querySnapshot.forEach(element => {
        const user = {
          ...element.data(),
          id:element.id,
        }
        usersArray.push(user)
      }); 
      setUsers(usersArray)
    })

   
    return unsuscribe
  },[])


 
  
  const sendMessage = async (e) =>{
    e.preventDefault()
    const myRef = doc(db, "messages",email, "chats",Authors);
    const fecha = new Date().getTime()
      await getDoc(myRef).then(docSnap=>{
        if (docSnap.exists()) {
          updateDoc(myRef, {
            messagesArray: arrayUnion({
              messageSended,
              createdAt:fecha,
              autorOfmessage:email
            })         
          });
        } else {
          setDoc(myRef,{messagesArray:[]})
          updateDoc(myRef, {
            messagesArray: arrayUnion({
              messageSended,
              createdAt:fecha,
              autorOfmessage:email
            })
          });
        }
      })
      setMessagesended("")
      
    }
  
  return (
    <div >
      <div className='flex items-center place-content-between p-4 border-b-2 border-b-gray-400 bg-[#1c1d1f]'>
          <User/>
          <h1 className='text-xl font-bold border-2 text-white border-gray-400 rounded-lg bg-[#373263c9] justify-center items-center flex p-4 '>Lets talk</h1>
          <SignOut setFalseUser={setUser}/>
      </div>
      <div className='grid grid-cols-[1fr_4fr]'>
        <div className='h-full bg-[#1c1d1f] border-r-[1px] border-gray-400'>
          {users.map(user => {
            return(
              <Online message={user} setAuthorsName={setAuthorsName} setMessages={setMessages}/>
            )})}
        </div>
          <div className='h-full' >
            {messages.map(msg => {
              return(
                <ChatMessages message={msg} />   
                )
            })}
          </div>
      </div>
      { Authors !== "" && (
        <form onSubmit={sendMessage} className="flex place-content-between">
          <input className='w-full border-2 border-gray-400 ' value={messageSended} onChange={(e)=>{setMessagesended(e.target.value)}} type="text" placeholder='Mensaje' />
          <button className='bg-green-400 px-4 py-2' type='submit' disabled={!messageSended}>Enviar</button>
        </form>
      )
      }
    </div>
  )
}

import { collection, onSnapshot, orderBy, limit,query, doc} from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { auth, db } from '../../../Firebase'
import Online from '../Online/Online'
import SignOut from '../SignWhitGoogle/SignOut'
import ChatMessages from './ChatMessages'
import FormMessages from './FormMessages'

export default function Chats({setUser}) {
  const [Mymessages, setMyMessages] = useState([])
  const [OtherUsermessages, setOtherUsermessages] = useState([])
  const [users, setUsers] = useState([])
  const {email} = auth.currentUser
  const [Authors, setAuthors] = useState("")
  const [NameOfUser, setNameOfUser] = useState("")

  if(Authors){
    //onSnapshot esta escuchando ambos documentos para despues traer los mensajes guardados
    onSnapshot(doc(db,"messages", email, "chats", Authors ), (doc) => {
      const allMessages = []
        if(doc.data()){
          doc.data().messagesArray.forEach((change)=>{
            allMessages.push(change)
          })
        }
        setMyMessages(allMessages)
      });
      onSnapshot(doc(db,"messages",Authors, "chats", email ), (doc) => {
        const allMessages = []
        if(doc.data()){
          doc.data().messagesArray.forEach((change)=>{
            allMessages.push(change)
          })
        }
        setOtherUsermessages(allMessages)
      });
    }
    
    //Acomoda el array de los mensajes por el timestamp
      const messages = Mymessages.concat(OtherUsermessages)
      messages.sort((a,b) =>{
        if(a.createdAt < b.createdAt){
            return -1
          }else{
            return 1
          }
      })

  const setAuthorsName = async (displayName)=>{
    setAuthors(displayName)

  }

  useEffect(()=>{
    //Trae a los usuarios online y offline
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

  return (
    <div>
      <div className='flex items-center place-content-between p-4 border-b-2 border-b-gray-400 bg-[#1c1d1f]'>
        <SignOut  setFalseUser={setUser}/>
        <p className='px-8 py-4 text-right bg-[#1c1d1f] text-gray-300'>{NameOfUser}</p>
      </div>
      <div className='grid grid-cols-[1fr_4fr]'>
        <div className='h-full bg-[#1c1d1f] border-r-[1px] border-gray-400'>
          {users.map(user => {
            return(
              <Online message={user} setAuthorsName={setAuthorsName} setNameOfUser={setNameOfUser} />
              )})}
        </div>
          <div className='min-h-[1000px]  ' >
            {messages.map(msg => {
              return(
                <ChatMessages message={msg} />   
                )
            })}
          </div>
      </div>
        <FormMessages email={email} Authors={Authors}/> 
    </div>
  )
}

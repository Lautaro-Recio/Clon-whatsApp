import { collection, onSnapshot, orderBy, limit,query, doc} from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { auth, db } from '../../../Firebase'
import Online from '../Online/Online'
import SignOut from '../SignWhitGoogle/SignOut'
import ChatMessages from './ChatMessages'
import FormMessages from './FormMessages'
import ChatWhit from './ChatWhit'
import Menu from '../Icons/Menu'
import CloseX from '../Icons/Closex'
import logo from "../../assets/imgs/chat.png"

export default function Chats({setUser}) {
  const [Mymessages, setMyMessages] = useState([])
  const [OtherUsermessages, setOtherUsermessages] = useState([])
  const [users, setUsers] = useState([])
  const [Authors, setAuthors] = useState("")
  const [NameOfUser, setNameOfUser] = useState("")
  const [AuthorPhoto, setAuthorPhoto] = useState("")
  const [OpenNav, setOpenNav] = useState(true)

  const [ClassOfNav, setClassOfNav] = useState(`hidden`)



  const {email} = auth.currentUser
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

  const openMenu = ()=>{
    setClassOfNav(`fixed top-14 w-full block bg-[#1c1d1f] p-4 h-full scroll-y-auto md:w-1/4 md:top-16`)
    setOpenNav(false)
  }
  const closeMenu = ()=>{
    setClassOfNav(`hidden`)
    setOpenNav(true)

  }

  return (
    <div>
      <div className='grid grid-cols-3 items-center place-content-between p-4 border-b-2 border-b-gray-400 bg-[#1c1d1f] fixed w-full top-0'>
        { OpenNav ? (
            <button onClick={openMenu}>   
              <Menu/>
            </button>
            ) : (
            <button  onClick={closeMenu}>   
              <CloseX/>
            </button> 
            )
          }
          <div className=' gap-4 hidden md:flex justify-center items-center'>
            <img src={logo} alt="logo" className='w-10 h-10'/>
            <p className='text-white text-xl  '>Lets talk</p>
          </div>
        <ChatWhit AuthorPhoto={AuthorPhoto} NameOfUser={NameOfUser}/>
      </div>
      
      <div className='h-full block'>
        <div className={ClassOfNav}>
          <div className='overflow-y-visible'>
            <p className='p-4 text-white text-lg'>Chats</p>
            { users.map(user => {
            return(
              <Online OpenNav={OpenNav} message={user} setAuthorsName={setAuthorsName} setNameOfUser={setNameOfUser} setAuthorPhoto={setAuthorPhoto} closeMenu={closeMenu} />
              )})}
          </div>
          <SignOut setFalseUser={setUser}/>
        </div>
      </div>

      <div className={`mt-10 h-[768px]`}>
        <div className={`w-full h-[768px] overflow-y-auto`}>
            {messages.map(msg => {
              return(
                <ChatMessages message={msg} />   
                )
              })}
        </div>

        <FormMessages email={email} Authors={Authors}/> 
      </div>

    </div>
  )
}

import { collection, doc, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { auth, db } from "../Firebase";
import Chats from "./Components/Chats/Chats";
import WelcomePage from "./Components/Pages/WelcomePage";
export default function App() {
  const [authUser, setAuthUser] = useState(false)
  const [windowHeight, setwindowHeight] = useState(0)

  useEffect(() => {
    setwindowHeight(window.screen.height)
  },[]);

  const getLinkById = async (id,stateOfuser) =>{
    const ref = doc(db, "messages",id);
    await updateDoc(ref, {
      online: stateOfuser,
    });   
  }
  const setTrueUser = () =>{
    setAuthUser(true)
    const {email} = auth.currentUser
    getLinkById(email,true)
  }
  const setFalseUser = () =>{
    setAuthUser(false)
    const {email} = auth.currentUser
    getLinkById(email,false)
    auth.signOut
  }
  return (
    <div className={` bg-[url('./assets/imgs/wppFondo.jpg')] min-h-[${windowHeight}] `}>
      {authUser === false ?(
          <WelcomePage setUser={setTrueUser} />
        ):(
          <Chats setUser={setFalseUser}/>
        )
      }
    </div>
  )
}
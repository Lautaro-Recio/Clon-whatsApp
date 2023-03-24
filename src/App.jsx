import { collection, doc, updateDoc } from "firebase/firestore";
import { useState } from "react";
import { auth, db } from "../Firebase";
import Chats from "./Components/Chats/Chats";
import WelcomePage from "./Components/Pages/WelcomePage";
import chat from "./assets/imgs/wppFondo.jpg"
export default function App() {
  const [authUser, setAuthUser] = useState(false)

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
    <div className={` bg-[url('./assets/imgs/wppFondo.jpg')]`}>
      {authUser === false ?(
          <WelcomePage setUser={setTrueUser} />
        ):(
          <Chats setUser={setFalseUser}/>
        )
      }
    </div>
  )
}
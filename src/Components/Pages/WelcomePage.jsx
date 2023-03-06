import React from 'react'
import SignIn from "../SignWhitGoogle/SignIn";
import chat from "../../assets/imgs/chat.png"

export default function WelcomePage({setUser,userIn}) {
  return (
    <div className='flex  w-full h-full justify-center space-y-10 items-center '>
        <div className='block space-y-10 my-32'>

            <img className='w-60 h-60 mt-24' src={chat} alt="Logo chat" />
            <SignIn setUserTrue={setUser}/>
        </div>
    </div>
  )
}

import React from 'react'
import SignIn from "../SignWhitGoogle/SignIn";
import chat from "../../assets/imgs/chat.png"

export default function WelcomePage({setUser,userIn}) {
  return (
    <div className='flex w-full h-full justify-center space-y-10 items-center '>
        <div className='block space-y-10 my-32 border-gray-400 rounded-lg bg-[#373263c9] border-2 py-6 px-12'>
            <h1 className='text-xl font-bold  text-white  justify-center items-center flex '>Lets talk</h1>
            <img className='w-60 h-60 mt-24' src={chat} alt="Logo chat" />
            <SignIn setUserTrue={setUser}/>
        </div>
    </div>
  )
}

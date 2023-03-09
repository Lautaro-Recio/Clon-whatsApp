import React from 'react'
import chat from "../../assets/imgs/chat.png"


export default function SignOut(props) {
  return(
    <button className='flex justify-center items-center w-50 h-10 p-6 border-2 border-gray-400 rounded-lg bg-[#373263c9]  ' onClick={()=>props.setFalseUser()}>
      <img className='w-8 h-8 mr-4 ' src={chat} alt="Logo chat" />
      <p className='text-white'>SignOut</p>
    </button>
  )
}

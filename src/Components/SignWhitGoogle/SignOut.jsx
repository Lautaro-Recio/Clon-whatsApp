import React from 'react'
import exit from "../../assets/imgs/exit.png"


export default function SignOut(props) {
  return(
    <button className='flex w-full p-4 border-[1px] border-gray-400 mb-2 text-gray-300 gap-2 justify-center items-center ' onClick={()=>props.setFalseUser()}>
      <img className='w-8 h-8 mr-4 ' src={exit} alt="Logo chat" />
      <p className='text-white'>SignOut</p>
    </button>
  )
}

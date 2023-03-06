import React from 'react'
import { auth } from '../../../Firebase'

export default function SignOut({setFalseUser}) {
  return(
    <button className='flex justify-center space-x-2 items-center w-60 h-10 border-2 border-gray-400 px-4 py-2 bg-[#373263c9] rounded-lg' onClick={()=>setFalseUser()}>
      <p className='text-white'>SignOut</p>
    </button>
  )
}

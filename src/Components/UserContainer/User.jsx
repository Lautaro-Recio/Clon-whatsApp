import React from 'react'
import { auth } from '../../../Firebase'
export default function User() {
    const {displayName , photoURL} = auth.currentUser
    return (
    <div className='flex justify-center items-center place-content-between border-2 border-gray-400 rounded-lg bg-[#373263c9] px-4 py-2'>
        <img className='w-10 h-10 rounded-full mr-4' src={photoURL} alt="Avatar" />
        <p className='text-white'>{displayName}</p>
    </div>
  )
}

import React from 'react'
import SignOut from '../SignWhitGoogle/SignOut'
import User from './User'

export default function UserContainer(props) {
  return (
        <div className='flex items-center place-content-between p-4 border-b-2 border-b-gray-400 bg-[#1c1d1f]'>
          <User/>
          <h1 className='text-xl font-bold border-2 text-white border-gray-400 rounded-lg bg-[#373263c9] justify-center items-center flex p-4 '>Lets talk</h1>
          <SignOut setFalseUser={props.setUser}/>
        </div>  )
}

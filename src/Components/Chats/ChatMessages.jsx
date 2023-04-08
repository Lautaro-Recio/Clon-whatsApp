import React from 'react'
import { auth } from '../../../Firebase'

export default function ChatMessages(props) {

    const messages = props.message.autorOfmessage === auth.currentUser.email ? "justify-end  " : "justify-start"
    const messagesAuthor = props.message.autorOfmessage === auth.currentUser.email ? "bg-blue-500" : "bg-green-500"
    const cero = props.message.minutes < 10 ? 0 : ""

    return (
    
    <div className={`flex rounded-lg  text-white px-4 py-2  m-2 ${messages}`}>
      
          <div className={` flex p-4 my-4 rounded-lg max-w-[400px] ${messagesAuthor}`}>
            <p className='min-w-[50px] max-w-[400px] '>{props.message.messageSended}</p>
            <p className='text-gray-300 text-xs mt-2 ml-2'>{props.message.hours}:{cero}{props.message.minutes}</p>
          </div>
    </div>
  )
}


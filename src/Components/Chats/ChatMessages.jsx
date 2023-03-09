import React from 'react'
import { auth } from '../../../Firebase'

export default function ChatMessages(props) {

    const messages = props.message.autorOfmessage === auth.currentUser.email ? "justify-end  " : "justify-start"
    const messagesAuthor = props.message.autorOfmessage === auth.currentUser.email ? "bg-blue-500" : "bg-green-500"

    return (
    
    <div className={`flex rounded-lg  text-white px-4 py-2  m-2 ${messages}`}>
      <div>
          <div className={`  p-4 my-4 rounded-lg max-w-[400px] ${messagesAuthor}`}>
            <p className='min-w-[50px]'>{props.message.messageSended}</p>
          </div>
      </div>
    </div>
  )
}


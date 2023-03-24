
import React from 'react'
import { auth} from '../../../Firebase'

export default function Online(props) {
    const {email, online ,displayName, photoURL} = props.message

    const classOnline = online === false ? "bg-red-500 " : "bg-green-500"
    const onlineText = online === false ? "offline" : "online"
    const myEmail = auth.currentUser.email

    const returnMessages = async (e) =>{
        props.setAuthorsName(email)
        props.setNameOfUser(displayName)
        props.setAuthorPhoto(photoURL)

    }

    return (
        <>
            { email !== myEmail && 
                (
                    <button key={email} onClick={()=>returnMessages()} className={`w-full p-4 border-[1px] border-gray-400 mb-2 text-gray-300  gap-2`}>
                        <div className='flex'>
                            <img className='h-6 w-6 rounded-full mr-2' src={photoURL} alt="Avatar" />
                            <p className='text' >{displayName}</p>
                        </div>
                        <div className='flex ml-10 items-center gap-2'>
                            <p>{onlineText}</p>
                            <span className={`rounded-full block h-[10px] w-[10px] ${classOnline}`}></span>
                        </div>
                    </button>
                )
            }
        </>
    )
}



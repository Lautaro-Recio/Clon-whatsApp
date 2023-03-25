import React from 'react'

export default function ChatWhit(props) {
    return (
        <>
        { props.AuthorPhoto && (
            <div className='flex border-2 justify-center items-center border-gray-400 rounded-lg bg-[#373263c9] p-4 w-36  md:w-2/4 h-12 md:ml-[25%] '>
                <img className='w-8 h-8 ml-4 rounded-[100%] ' src={props.AuthorPhoto} alt="Avatar" />
                <p className='px-4 py-2 text-center md:text-right text-white  '>{props.NameOfUser}</p>
            </div>
        )
        }
        </>
    )
}

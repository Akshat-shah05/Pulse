'use-client'
import React from 'react'
import { Button } from '../ui/button'

interface friendProps {
    friend: string | undefined
}

const FriendRequestCard = ({friend}: friendProps) => {
  return (
    <>
        <div
        className="relative drop-shadow-xl w-1/2 h-10 overflow-hidden rounded-xl bg-black flex flex-row"
        >
            <div
                className="absolute flex items-center justify-center text-white z-[1] opacity-90 rounded-xl inset-0.5 bg-[#323132]"
            >
                {friend}
            </div>
            <div className="absolute w-56 h-48 bg-white blur-[50px] -left-1/2 -top-1/2"></div>
        </div>
    </>
  )
}

export default FriendRequestCard
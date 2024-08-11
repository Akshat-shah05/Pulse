'use client'
import { Key, useState } from "react"
import FriendCard from "../friendCard/FriendCard"
import Navbar2 from "../navbar2/Navbar2"
import FriendRequestCard from "../friendCard/FriendRequestCard"

export default function FriendList({friends, friendRequests, username}: any) {
    const [active, setActive] = useState<number>(0)
    
    console.log(friends, friendRequests)
    const changeActive1 = () => {
        if (active == 1) {
            setActive(0)
        }
    }

    const changeActive2 = () => {
        if (active == 0) {
            setActive(1)
        }
    }

    return (
        <>
        <Navbar2 />
        <div className="h-screen w-full bg-background flex flex-col items-center">
            <div className="flex flex-row justify-space-between">
                <button className={`text-xl mt-10 mb-10 mr-10 ${active == 0 ? 'primary underline' : ''}`} onClick={changeActive1}> Friends </button>
                <button className={`text-xl mt-10 mb-10 mr-10 ${active == 1 ? 'primary underline' : ''}`} onClick={changeActive2}> Friend Requests </button>
            </div>
            {active == 0 &&
            <div className="container mx-auto px-4 md:px-6 py-8">
                <div className="flex flex-col gap-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {friends.map((friend: string , index: Key | null | undefined) => (
                        <FriendCard friend={friend} username={username} key={index} />
                    ))}
                    </div>
                </div>
            </div>
            }
            {active == 1 &&
            <div className="container mx-auto px-4 md:px-6 py-8">
                <div className="flex flex-col gap-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {friendRequests.map((friend: string , index: Key | null | undefined) => (
                        <FriendRequestCard friend={friend} username={username} key={index} />
                    ))}
                    </div>
                </div>
            </div>
            }
        </div>
    </>
    )
}
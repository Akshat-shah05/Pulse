import React from 'react'
import FriendCard from '@/components/friendCard/FriendCard'
import { getServerSession } from "next-auth";
import { db } from '@/lib/db';
import Navbar2 from '@/components/navbar2/Navbar2';

const page = async () => {
    const user = await getServerSession();

    // Get the email, check if email exists
    let email = user?.user?.email;
    let friends;
    console.log(email);

    // if email exists, replace email with the associated username
    if(email) {
        const person = await db.user.findUnique({
            where: {email: email}
        })
        email = person?.username;
        friends = person?.friends;
    }

    console.log(friends ? "hi" : "no")

  return (
    <>
        <Navbar2 />
        <div className="h-screen w-full bg-black flex flex-col items-center">
            <h1 className="text-7xl text-white mt-10 mb-10"> Friends </h1>
            {friends
            ? 
            friends.map((friend: string | undefined) => {
                return (<FriendCard key={friend} friend={friend} />)
            }) 
            : 
            <div> Damn bro you got NO friends</div>
            }
        </div>
    </>
  )
}

export default page
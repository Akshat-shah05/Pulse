import React from 'react'
import { getServerSession } from "next-auth";
import { db } from '@/lib/db';
import FriendList from '@/components/friendList/FriendList';

const page = async () => {
    const user = await getServerSession();
    // Get the email, check if email exists
    let email = user?.user?.email;
    let friends;
    let friendRequests;

    // if email exists, replace email with the associated username
    if(email) {
        const person = await db.user.findUnique({
            where: {email: email}
        })
        email = person?.username;
        friends = person?.friends;
        friendRequests = person?.friendRequests;
    }

    console.log(friends)
    console.log(friendRequests)
 
  return (
    <FriendList friends={friends} friendRequests={friendRequests} username={email}/>
  )
}

export default page
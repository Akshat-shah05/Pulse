import {NextResponse} from "next/server"
import { db } from "@/lib/db";
import { z } from 'zod';

const userSchema = z
  .object({
    friend: z.string()
  })

export async function POST (req: Request) {
    try {
        const body = await req.json()

        console.log("this is body" + body)

        const { friend, username } = body

        console.log("this is", friend, username)

        const user = await db.user.findUnique({
            where: { username },
          });
          
        if (!user) {
            return NextResponse.json(
                {user: null, message: "current session with this user does not exist"},
                {status: 404}
            );
        }

        const isFriend = user?.friends.includes(friend)

        const friendUser = await db.user.findUnique({
            where: { username: friend },
          });

        if (isFriend) {
            console.log("This user is already your friend")
            return NextResponse.json(
                {result: false, message: "This user is already your friend"},
                {status: 404},
            )
        }

        if (!friendUser) {
            console.log("This user does not exist")
            return NextResponse.json(
                {result: false, message: "This user does not exist"},
                {status: 400}
            )
        } 
        const updatedUser = await db.user.update({
            where: { username },
            data: {
                friends: {
                push: friend,
                },
            },
        });

        console.log(`${friend} has been added as a friend for ${username}`)
        return NextResponse.json(
            {user: updatedUser, result: true, message: `${friend} has been added as a friend for ${username}`},
            {status: 200}
        )
        
      
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            {message: "Internal Server Error"},
            {status: 500}
        )
    }
}
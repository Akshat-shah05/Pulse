
import { db } from "@/lib/db";
import { NextResponse } from "next/server";
export async function POST (req: Request) {

    const user = await req.json();
    const { userId, incrementBy } = user
    console.log(userId, incrementBy)

    try {
        const updatedUser = await db.user.update({
          where: {
            username: userId,
          },
          data: {
            pushupsAllTime: {
              increment: incrementBy,
            },
          },
        });
        return NextResponse.json({ updatedUser: updatedUser, message: "User updated Successfully" }, {status: 201})
    } catch(error) {
        console.log(error)
        return NextResponse.json({error: "something went wrong"})
    }
}
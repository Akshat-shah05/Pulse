import { NextResponse } from "next/server"
import { db } from "@/lib/db";

export async function POST(req: Request) {
      try {
        // Fetch the current user from the database
        const body = await req.json()
        const { friend, currentUser } = body;

        const user = await db.user.findUnique({
          where: { username: currentUser },
        });
  
        if (!user) {
          return NextResponse.json(
            { user: null, message: "user not found"},
            { status: 404 }
          )
        }
  
        // Remove the friend from the friendRequests array
        const updatedFriendRequests = user.friendRequests.filter(request => request !== friend);
  
        // Update the user in the database
        await db.user.update({
          where: { username: currentUser },
          data: { friendRequests: updatedFriendRequests },
        });
  
        return NextResponse.json(
            { user: updatedFriendRequests, message: "Successfully Deleted Friend Request"},
            { status: 200 }
          )
      } catch (error) {
        console.error(error);
        return NextResponse.json(
            {message: "Internal Server Error"},
            {status: 500}
        );
      }
  }
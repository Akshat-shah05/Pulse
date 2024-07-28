import {NextResponse} from "next/server"
import { db } from "@/lib/db";

// POST request received at this enpoint (api/friends/add)
export async function POST (req: Request) {
    try {
        // Get the body from the request, should be friend: friendUsername, and username: username
        const body = await req.json();

        const { friend, username } = body;

        // test
        console.log("this is", friend, username);

        // get the current user, also serves as a way to confirm that the session exists, security ig lol?
        const user = await db.user.findUnique({
            where: { username },
          });
        
        // if user doesn't exist, idek how they got here but ... 🤷‍♂️
        if (!user) {
            return NextResponse.json(
                {user: null, message: "current session with this user does not exist"},
                {status: 404}
            );
        };

        // Check if the friend is already in the friends array in the databse for the specific username in the current session
        const isFriend = user?.friends.includes(friend);

        // Check if the friend provided even exists in the first place
        const friendUser = await db.user.findUnique({
            where: { username: friend },
          });
        
        // handle if they are already a friend
        if (isFriend) {
            console.log("This user is already your friend");
            return NextResponse.json(
                {result: false, message: "This user is already your friend"},
                {status: 404},
            );
        };
        
        // handle if the friend being added doesn't exist
        if (!friendUser) {
            console.log("This user does not exist");
            return NextResponse.json(
                {result: false, message: "This user does not exist"},
                {status: 400}
            );
        };

        // given that the friend is not already a friend and the friend exists in our databse, update the usernames friend array
        const updatedUser = await db.user.update({
            where: { username: friend },
            data: {
                friendRequests: {
                push: username,
                },
            },
        });

        console.log(`${friend} has been added as a friend for ${username}`)
        return NextResponse.json(
            {user: updatedUser, result: true, message: `${friend} has been added as a friend for ${username}`},
            {status: 200}
        );
        
      
    } catch (error) {
        // Make the error handling way more robust than this
        console.error(error);
        return NextResponse.json(
            {message: "Internal Server Error"},
            {status: 500}
        );
    };
};
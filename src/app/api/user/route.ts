import { NextResponse } from "next/server"
import { db } from "@/lib/db";
import { hash } from "bcrypt";
import { z } from 'zod';

// Schema for input validation
const userSchema = z
  .object({
    username: z.string().min(1, 'Username is required').max(100),
    email: z.string().min(1, 'Email is required').email('Invalid email'),
    password: z
      .string()
      .min(1, 'Password is required')
      .min(8, 'Password must have than 8 characters'),
  })


export async function POST (req: Request) {
    try {
        const body = await req.json();
        const { email, username, password } = userSchema.parse(body);

        // Check if the email already exits

        const emailAlreadyExists = await db.user.findUnique({
            where: { email: email }
        })

        if (emailAlreadyExists) {
            return NextResponse.json(
                {user: null, message: "User with this email already exists"}, 
                {status: 409}
            )
        }

        // Check if username already exists

        const userNameAlreadyExists = await db.user.findUnique({
            where: { username: username }
        })

        if (userNameAlreadyExists) {
            return NextResponse.json(
                {user: null, message: "User with this username already exists"}, 
                {status: 409}
            )
        }

        // If successful --> store into database

        // Before adding a new user, ensure that you encrypt the password!
        const encryptedPassword = await hash(password, 10)

        const newUser = await db.user.create({
            data: {
                username, 
                email, 
                password: encryptedPassword
            }
        })

        // Security: Don't need to send the user password back
        const { password: newUserPassword, ... rest} = newUser

        return NextResponse.json({ user: rest, message: "User Created Successfully" }, {status: 201})

    } catch (error) {
        return NextResponse.json({ message: "Something went wrong" }, {status: 500})
    }

}
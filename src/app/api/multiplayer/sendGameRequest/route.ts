import { getSession } from 'next-auth/react';
import { db } from '@/lib/db';
import { NextResponse } from 'next/server';


export async function POST(req: Request) {
    try {
        const body = await req.json()
        const { toUsername, fromUsername } = body;

        // if the person sending isn't auth
        const fromUser = await db.user.findUnique({
            where: { username: fromUsername },
          });
    
          if (!fromUser) {
            return NextResponse.json(
              { user: null, message: "user not found"},
              { status: 404 }
            )
          }
        
        // if the person sent to isn't a valid person in the db
        const toUser = await db.user.findUnique({
            where: { username: toUsername },
          });
    
          if (!toUser) {
            return NextResponse.json(
              { user: null, message: "person you are sending a request to not found"},
              { status: 404 }
            )
          }

    } catch (error) {
        return NextResponse.json(
            {message: "Internal Server Error"},
            {status: 500}
        );
    }
  
    // You can add logic to save game request to the database if needed
  
    return NextResponse.json({ message: 'Game request sent' }, { status: 200 });
  }
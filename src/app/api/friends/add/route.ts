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
        const { friend } = body

    } catch (error) {
        
    }
}
'use client'

import { signOut } from "next-auth/react"

export default function Logout() {
    return (
        <span onClick={() => signOut({ callbackUrl: 'http://localhost:3000/' })}> Logout </span>
    )
}
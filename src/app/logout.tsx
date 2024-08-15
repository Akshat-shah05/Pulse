'use client'
import { Button } from "@/components/ui/button"
import { signOut } from "next-auth/react"

// simple onclick logout, calls onclick callback is signOut from next-auth
export default function Logout() {
    return (
        <Button variant="ghost" size="sm" onClick={() => signOut()}> Logout </Button>
    )
}
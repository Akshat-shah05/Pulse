'use-client'
import React from 'react'
import Logout from '@/app/logout' 
import AddFriendButton from '../addFriendButton/AddFriendButton'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
  import "./cube.css"
import Link from "next/link"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"

// props for username, received from Dashboard.tsx

// IMPORTANT --> EVENTUALLY REPLACE WITH CONTEXT, PASSING PROPS DOWN NESTED COMPONENTS ISN"T GOOD !!!
interface Props {
    username: string | undefined | null
}

// navbar component
const Navbar = ({username}: Props) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
        <div className="container flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
            <nav className="flex items-center gap-4 text-sm font-medium">
                <Link href="#" className="text-primary" prefetch={false}>
                Home
                </Link>
                <Link href="#" className="text-muted-foreground hover:text-foreground" prefetch={false}>
                Leaderboards
                </Link>
                <Link href="#" className="text-muted-foreground hover:text-foreground" prefetch={false}>
                Contact Us
                </Link>
                <Link href="/dashboard/friends" className="text-muted-foreground hover:text-foreground" prefetch={false}>
                Friends
                </Link>
            </nav>
            
            <div className="flex items-center gap-4">
                <div className='pr-4'>
                    <AddFriendButton username={username}/>
                </div>
                <div>
                    <DropdownMenu>
                        <DropdownMenuTrigger>
                            <Avatar className="h-8 w-8 border-[#c873fa] hover:bg-[#e3fff9] hover:text-accent-foreground border">
                                <AvatarImage src="" />
                                <AvatarFallback>JD</AvatarFallback>
                            </Avatar>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuLabel>My Account</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="w-full"><div className="w-full"><Logout /></div></DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </div>
    </header>
  )
}

export default Navbar
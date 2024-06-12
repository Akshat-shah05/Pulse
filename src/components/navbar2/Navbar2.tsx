'use-client'
import React from 'react'
import Logout from '@/app/logout' 
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
  

// props for username, received from Dashboard.tsx

// IMPORTANT --> EVENTUALLY REPLACE WITH CONTEXT, PASSING PROPS DOWN NESTED COMPONENTS ISN"T GOOD !!!

// navbar component
const Navbar2 = () => {
  return (
    <div className="flex flex-wrap bg-black">
        <section className="relative mx-auto">
            <nav className="flex justify-between bg-black text-white w-screen border-b-2 border-purple-200 items-center">
                <div className="px-5 xl:px-12 py-6 flex w-full items-center">

                    <div
                    className="p-1 animate-spin drop-shadow-2xl bg-gradient-to-bl text-black from-pink-400 via-purple-400 to-indigo-600 md:w-12 md:h-12 h-16 w-16 aspect-square rounded-full"
                    >
                        <div
                            className="rounded-full h-full w-full bg-zinc-900 background-blur-md"
                        ></div>
                    </div>
                    <a className="text-3xl font-bold font-heading pl-6" href="#">
                        <h1> Pulse </h1>
                    </a>
                    
                    {/* Make this part responsive -- Do later though too lazy rn */}
                    <ul className="md:flex px-4 mx-auto font-semibold font-heading space-x-12">
                        <li><a className="hover:text-[#c873fa]" href="/dashboard">Home</a></li>
                        <li><a className="hover:text-[#c873fa]" href="#">Leaderboards</a></li>
                        <li><a className="hover:text-[#c873fa]" href="#">Contact Us</a></li>
                        <li><a className="hover:text-[#c873fa]" href="/dashboard/friends"> Friends </a></li>
                    </ul>
                    
                </div>
            
            {/* 

                Keeping this for toggle, might end up using it

                <button onClick={toggleDropdown} className="text-white bg-black focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 hover:text-cyan-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </button>
                {dropdownIsOpen && (
                    <h1 className="text-white"> BOOMER </h1>
                )}
            */}
                <div className="pr-4 ml-6 mt-1">
                    <DropdownMenu>
                        <DropdownMenuTrigger>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 hover:text-[#c873fa]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuLabel>My Account</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="w-full"><div className="w-full"><Logout /></div></DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>

            </nav>  
        </section>
    </div>
  )
}

export default Navbar2
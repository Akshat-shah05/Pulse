'use client'
import React from 'react'
import Logout from '@/app/logout' 
import { Button } from '@/components/ui/button'

const Navbar = () => {
  return (
    <div className="flex flex-wrap h-screen bg-black">
        <section className="relative mx-auto">
            <nav className="flex justify-between bg-black text-white w-screen border-b-2">
                <div className="px-5 xl:px-12 py-6 flex w-full items-center">
                    <a className="text-3xl font-bold font-heading" href="#">
                        <h1> Pulse </h1>
                    </a>
                    
                    {/* Make this part responsive -- Do later though too lazy rn */}
                    <ul className="md:flex px-4 mx-auto font-semibold font-heading space-x-12">
                        <li><a className="hover:text-cyan-200" href="#">Home</a></li>
                        <li><a className="hover:text-cyan-200" href="#">Catagory</a></li>
                        <li><a className="hover:text-cyan-200" href="#">Collections</a></li>
                        <li><a className="hover:text-cyan-200" href="#">Contact Us</a></li>
                    </ul>
                    
                </div>

                <button id="dropdownDefaultButton" data-dropdown-toggle="dropdown" className="text-white bg-black focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 hover:text-cyan-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </button>

            </nav>
                
        </section>
    </div>
  )
}

export default Navbar
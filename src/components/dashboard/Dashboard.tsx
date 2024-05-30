'use client'
import Navbar from "../navbar/Navbar"
import { ReactNode, createContext, useContext } from "react"

interface userProps {
  username: string | null | undefined
}

const Dashboard = ({username}: userProps) => {
  return (
    <>
      <div className="h-screen bg-black">
        <Navbar username={username}/>
        <h1 className="text-white"> Welcome {username}</h1>
      </div>
    </>
  )
}

export default Dashboard

/*
<Logout />
            <Button variant="outline"> Test Button </Button>
            <p className="text-white"> Hello {username} </p>

*/
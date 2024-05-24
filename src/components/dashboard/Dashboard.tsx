'use client'
import { Button } from "@/components/ui/button"
import Logout from "@/app/logout"
import Navbar from "../navbar/Navbar"

interface Props {
    username: string | undefined | null
}

const Dashboard = ({ username }: Props) => {

  return (
    <>
      <div className="h-screen bg-black">
        <Navbar />
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
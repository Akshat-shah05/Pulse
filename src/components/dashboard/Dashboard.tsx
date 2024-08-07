'use client';
import Navbar from "../navbar/Navbar";
import { useEffect, useState } from "react";
import CardList from "../card/Cardlist";

// props for the username
interface userProps {
  username: string | null | undefined
};

// dashboard component, accepts username from top levle page.tsx
const Dashboard = ({username}: userProps) => {
  // returns the Navbar alongside a welcome message. this is the entire dashboard page. LOTS TO COME!
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    let timer1 = setTimeout(() => setLoading(false), 2000)
    return () => {
      clearTimeout(timer1)
    }
  }, [])

  return (
    <>
    {
      loading ? 
      (
        <div className="h-screen bg-background flex flex-col justify-center items-center">
          <div
          className="p-4 animate-spin drop-shadow-2xl bg-gradient-to-bl text-black from-pink-400 via-purple-400 to-indigo-600 h-60 w-60 aspect-square rounded-full"
          >
              <div
                  className="rounded-full h-full w-full bg-background background-blur-md"
              ></div>
          </div>
        </div>
      ) : 
      (
        <>
          <div className="flex min-h-screen w-full flex-col bg-background">
            <Navbar username={username}/>
            <h1 className="text-4xl flex flex-row justify-center mt-5"> Welcome {username}</h1>
            <h2 className="text-primary text-2xl flex flex-row justify-center mt-5"> Start by choosing an excercise</h2>
            <CardList />
          </div>
        </>
      )
    }

    </>
  )
}

export default Dashboard

/*
<Logout />
            <Button variant="outline"> Test Button </Button>
            <p className="text-white"> Hello {username} </p>

*/
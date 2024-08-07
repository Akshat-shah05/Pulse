'use client';
import Navbar from "../navbar/Navbar";
import { useEffect, useState } from "react";
import CardList from "../card/Cardlist";
import { useRouter } from "next/navigation";

// props for the username
interface userProps {
  username: string | null | undefined
};

// dashboard component, accepts username from top levle page.tsx
const Dashboard = ({username}: userProps) => {
  // returns the Navbar alongside a welcome message. this is the entire dashboard page. LOTS TO COME!
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    let timer1 = setTimeout(() => setLoading(false), 2000)
    return () => {
      clearTimeout(timer1)
    }
  }, [])

  const handleMultiplayer = () => {
    console.log('mult')
    router.push("/dashboard/multiplayer")
  }

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
          <div className="flex min-h-screen w-full flex-col bg-background items-center">
            <Navbar username={username}/>
            <h1 className="text-4xl flex flex-row justify-center mt-5"> Welcome {username}</h1>
            <h2 className="text-primary text-2xl flex flex-row justify-center mt-5"> Start by choosing an excercise</h2>
            <CardList />
            <button className="flex flex-row justify-center w-4/5 p-16 bg-background border border-primary rounded-lg text-primary text-4xl" onClick={handleMultiplayer}> Multiplayer </button>
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
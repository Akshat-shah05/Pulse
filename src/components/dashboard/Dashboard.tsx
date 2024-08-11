'use client';
import Navbar from "../navbar/Navbar";
import { useEffect, useState } from "react";
import CardList from "../card/Cardlist";
import { useRouter } from "next/navigation";
import { getSocket } from "@/socket";

interface userProps {
  username: string | null | undefined
}

interface RequestReceivedProps {
  username: string;
  port: string;
}

const Dashboard = ({username}: userProps) => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [requestReceived, setRequestReceived] = useState<RequestReceivedProps | null>(null);

  useEffect(() => {
    let timer1 = setTimeout(() => setLoading(false), 2000);
    return () => {
      clearTimeout(timer1);
    };
  }, [username]);
  
  useEffect(() => {
    const socket = getSocket();
    socket.emit("register", username);
    socket.on("game-request", (fromUsername: string, senderPort: string) => {
      setRequestReceived({ username: fromUsername, port: senderPort });
    });
    return () => {
      socket.off("game-request");
    };
  }, [username]);

  useEffect(() => {
    console.log(requestReceived)
  }, [requestReceived])

  const handleMultiplayer = () => {
    router.push("/dashboard/multiplayer");
  }

  const acceptRequest = () => {
    if (requestReceived) {
      const socket = getSocket();
      socket.emit("accept-game-request", requestReceived.username);
      const roomId = `${username}-${requestReceived.username}`.replace(/\s+/g, '-').toLowerCase();
      router.push(`/game-room?username=${username}&roomId=${roomId}`);
    }
  };

  const declineRequest = () => {
    setRequestReceived(null);
  };

  return (
    <>
    {
      loading ? 
      (
        <div className="h-screen bg-background flex flex-col justify-center items-center">
          <div
          className="p-4 animate-spin drop-shadow-2xl bg-gradient-to-bl text-black from-pink-400 via-purple-400 to-indigo-600 h-60 w-60 aspect-square rounded-full"
          >
              <div className="rounded-full h-full w-full bg-background background-blur-md"></div>
          </div>
        </div>
      ) : 
      (
        <>
          <div className="flex min-h-screen w-full flex-col bg-background items-center">
            <Navbar username={username}/>
            <h1 className="text-4xl flex flex-row justify-center mt-5"> Welcome {username}</h1>
            <h2 className="text-primary text-2xl flex flex-row justify-center mt-5"> Start by choosing an exercise</h2>
            <CardList />
            <button className="flex flex-row justify-center w-4/5 p-16 bg-background border border-primary rounded-lg text-primary text-4xl" onClick={handleMultiplayer}> Multiplayer </button>
          </div>
          {requestReceived && 
            <div className="fixed top-0 left-0 w-full h-full flex items-start justify-start bg-black bg-opacity-50 z-50">
              <div className="bg-white p-4 rounded-md shadow-lg m-4">
                <p className="mb-4">{requestReceived.username} (on port {requestReceived.port}) has sent you an invitation to a battle. Do you accept?</p>
                <div className="flex justify-center space-x-2">
                  <button
                    onClick={acceptRequest}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
                  >
                    Accept
                  </button>
                  <button
                    onClick={declineRequest}
                    className="bg-gray-300 text-black px-4 py-2 rounded-md hover:bg-gray-400 transition"
                  >
                    Decline
                  </button>
                </div>
              </div>
            </div>
          }
        </>
      )
    }
    </>
  )
}

export default Dashboard;
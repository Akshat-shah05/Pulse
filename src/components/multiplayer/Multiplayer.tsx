'use client';
import { getSocket } from '@/socket';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { Socket } from 'socket.io-client';

interface userProps {
    username: string | null | undefined;
}

const Multiplayer = ({username}: userProps) => {
    const router = useRouter()
    const [isConnected, setIsConnected] = useState(true);
    const [friendUsername, setFriendUsername] = useState("");
    const [requestSent, setRequestSent] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [socket, setSocket] = useState<Socket | null>(null);

    useEffect(() => {
        const socket = getSocket();
        setSocket(socket);

        socket.on("connect", () => {
            setIsConnected(true);
        });
      
        socket.on("disconnect", () => {
            setIsConnected(false);
        });

        socket.on("user-not-found", (username: string) => {
            setErrorMessage(`User "${username}" not found.`);
            setRequestSent(false);
        });
        
        socket.on("user-not-online", (username: string) => {
            setErrorMessage(`User "${username}" is not online.`);
            setRequestSent(false);
        });

        socket.on("user-found", (username: string) => {
            setErrorMessage(`User "${username}" is found`);
        });


        socket.on("request-accepted", (acceptingUsername: string) => {
            const roomId = `${username}-${acceptingUsername}`.replace(/\s+/g, '-').toLowerCase();
            router.push(`/game-room?username=${username}&roomId=${roomId}`);
          });
      
        return () => {
            socket.off("connect");
            socket.off("disconnect");
            socket.off("user-not-found");
            socket.off("user-not-online");
            socket.off("user-found");
            socket.off("request-accepted");
        }; 
    }, []);

    const sendGameRequest = () => {
        if (friendUsername && username && socket) {
            const currentPort = window.location.port;
            socket.emit("send-game-request", friendUsername, username, currentPort);
            setRequestSent(true);
            setErrorMessage("");
        }
    };

    return (
        <div>
            <p>Status: {isConnected ? "connected" : "disconnected"}</p>
            <input
                type="text"
                placeholder="Enter friend's username"
                value={friendUsername}
                onChange={(e) => setFriendUsername(e.target.value)}
                disabled={requestSent}
            />
            <button onClick={sendGameRequest} disabled={requestSent}>
                Send Game Request
            </button>

            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        </div>
    );
}

export default Multiplayer;
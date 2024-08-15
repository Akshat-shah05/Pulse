'use client';

import { getSocket } from '@/socket';
import { useRouter } from 'next/navigation'; 
import React, { useEffect, useState } from 'react'; 
import { Socket } from 'socket.io-client'; 

// Define the props interface for the Multiplayer component
interface userProps {
    username: string | null | undefined; // The username of the current user
}

const Multiplayer = ({ username }: userProps) => {
    const router = useRouter(); 
    const [isConnected, setIsConnected] = useState(true); 
    const [friendUsername, setFriendUsername] = useState("");
    const [requestSent, setRequestSent] = useState(false); 
    const [errorMessage, setErrorMessage] = useState(""); 
    const [socket, setSocket] = useState<Socket | null>(null); // State to store the Socket instance

    // Effect hook to initialize and manage the socket connection
    useEffect(() => {
        const socket = getSocket(); // Get the Socket instance
        setSocket(socket); // Store the Socket instance in the state

        // Event listener for successful connection
        socket.on("connect", () => {
            setIsConnected(true);
        });
      
        // Event listener for disconnection
        socket.on("disconnect", () => {
            setIsConnected(false);
        });

        // Event listener for when the user is not found
        socket.on("user-not-found", (username: string) => {
            setErrorMessage(`User "${username}" not found.`);
            setRequestSent(false);
        });
        
        // Event listener for when the user is not online
        socket.on("user-not-online", (username: string) => {
            setErrorMessage(`User "${username}" is not online.`);
            setRequestSent(false);
        });

        // Event listener for when the user is found
        socket.on("user-found", (username: string) => {
            setErrorMessage(`User "${username}" is found`);
        });

        // Event listener for when a game request is accepted
        socket.on("request-accepted", (acceptingUsername: string) => {
            // Generate a room ID for the game room
            const roomId = `${username}-${acceptingUsername}`.replace(/\s+/g, '-').toLowerCase();
            // Navigate to the game room page
            router.push(`/game-room?username=${username}&roomId=${roomId}`);
        });
      
        // Clean up event listeners when the component unmounts
        return () => {
            socket.off("connect");
            socket.off("disconnect");
            socket.off("user-not-found");
            socket.off("user-not-online");
            socket.off("user-found");
            socket.off("request-accepted");
        }; 
    }, [router, username]); // Dependency array includes router and username to handle changes

    // Function to send a game request
    const sendGameRequest = () => {
        if (friendUsername && username && socket) {
            const currentPort = window.location.port; // Get the current port of the application
            socket.emit("send-game-request", friendUsername, username, currentPort); // Emit the game request event
            setRequestSent(true); // Update the state to indicate that a request has been sent
            setErrorMessage(""); // Clear any existing error messages
        }
    };

    // Render the component
    return (
        <div>
            {/* Display connection status */}
            <p>Status: {isConnected ? "connected" : "disconnected"}</p>
            {/* Input field for entering friend's username */}
            <input
                type="text"
                placeholder="Enter friend's username"
                value={friendUsername}
                onChange={(e) => setFriendUsername(e.target.value)} // Update state with input value
                disabled={requestSent} // Disable input if a request has been sent
            />
            {/* Button to send game request */}
            <button onClick={sendGameRequest} disabled={requestSent}>
                Send Game Request
            </button>

            {/* Display error message if any */}
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        </div>
    );
}

export default Multiplayer;

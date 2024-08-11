'use client'
import { socket } from '@/socket';
import React, { useEffect, useState } from 'react'

interface userProps {
    username: string | null | undefined
  };

const Multiplayer = ({username}: userProps) => {
    const [isConnected, setIsConnected] = useState(false);
    const [friendUsername, setFriendUsername] = useState("");
    const [requestSent, setRequestSent] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        socket.emit("register", username);
    })

  return (
    <div>Multiplayer</div>
  )
}

export default Multiplayer
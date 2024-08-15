// app/game-room/page.tsx
'use client';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import GameRoom from '@/components/GameRoom/GameRoom';

export default function GameRoomPage() {
  // searchParams to get url info
  const searchParams = useSearchParams();

  // user state + roomID, load game room passing in roomID and user props
  const [username, setUsername] = useState<string | null>(null);
  const [roomId, setRoomId] = useState<string | null>(null);

  useEffect(() => {
    setUsername(searchParams.get('username'));
    setRoomId(searchParams.get('roomId'));
  }, [searchParams]);

  if (!username || !roomId) {
    return <div>Loading...</div>;
  }

  return <GameRoom username={username} roomId={roomId} />;
}
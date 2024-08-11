// app/game-room/page.tsx
'use client';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import GameRoom from '@/components/GameRoom/GameRoom';

export default function GameRoomPage() {
  const searchParams = useSearchParams();
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
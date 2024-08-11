// components/GameRoom.tsx
'use client';
import { SetStateAction, useEffect, useRef, useState } from 'react';
import { getSocket } from '@/socket';
import Webcam from 'react-webcam';

interface GameRoomProps {
  username: string;
  roomId: string;
}

const GameRoom: React.FC<GameRoomProps> = ({ username, roomId }) => {
  const [peerUsername, setPeerUsername] = useState<string | null>(null);
  const localVideoRef = useRef<Webcam>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const socket = getSocket();

  useEffect(() => {
    socket.emit('join-game-room', roomId, username);

    socket.on('user-joined', (joinedUsername: SetStateAction<string | null>) => {
      setPeerUsername(joinedUsername);
    });

    socket.on('receive-video-stream', (stream: MediaProvider | null) => {
      if (remoteVideoRef.current) {
        remoteVideoRef.current.srcObject = stream;
      }
    });

    return () => {
      socket.off('user-joined');
      socket.off('receive-video-stream');
    };
  }, [roomId, username]);

  useEffect(() => {
    if (localVideoRef.current && localVideoRef.current.video) {
      const stream = localVideoRef.current.video.srcObject as MediaStream;
      socket.emit('send-video-stream', roomId, stream);
    }
  }, [localVideoRef, roomId]);

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h2>Your Video</h2>
          <Webcam
            ref={localVideoRef}
            audio={false}
            width={400}
            height={300}
          />
        </div>
        <div>
          <h2>{peerUsername ? `${peerUsername}'s Video` : 'Waiting for opponent...'}</h2>
          <video
            ref={remoteVideoRef}
            autoPlay
            playsInline
            width={400}
            height={300}
          />
        </div>
      </div>
    </div>
  );
};

export default GameRoom;
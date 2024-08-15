'use client'; 

import { SetStateAction, useEffect, useRef, useState } from 'react'; 
import { getSocket } from '@/socket'; 
import Webcam from 'react-webcam'; 

// Define the props interface for the GameRoom component
interface GameRoomProps {
  username: string;
  roomId: string;
}

const GameRoom: React.FC<GameRoomProps> = ({ username, roomId }) => {
  const [peerUsername, setPeerUsername] = useState<string | null>(null); // State to store the peer's username
  const localVideoRef = useRef<Webcam>(null); // Ref to access the local webcam component
  const remoteVideoRef = useRef<HTMLVideoElement>(null); // Ref to access the remote video element
  const socket = getSocket(); // Get the Socket instance

  // Effect hook to handle socket events and join the game room
  useEffect(() => {
    // Emit an event to join the specified game room with the current username
    socket.emit('join-game-room', roomId, username);

    // Event listener for when a user joins the game room
    socket.on('user-joined', (joinedUsername: SetStateAction<string | null>) => {
      setPeerUsername(joinedUsername); // Set the peer's username
    });

    // Event listener for receiving a video stream from the peer
    socket.on('receive-video-stream', (stream: MediaProvider | null) => {
      if (remoteVideoRef.current) {
        remoteVideoRef.current.srcObject = stream; // Set the received stream as the source for the remote video element
      }
    });

    // Clean up event listeners when the component unmounts
    return () => {
      socket.off('user-joined');
      socket.off('receive-video-stream');
    };
  }, [roomId, username]); // Dependency array includes roomId and username

  // Effect hook to send the local video stream to the game room
  useEffect(() => {
    if (localVideoRef.current && localVideoRef.current.video) {
      const stream = localVideoRef.current.video.srcObject as MediaStream; // Get the local video stream
      socket.emit('send-video-stream', roomId, stream); // Emit the local video stream to the game room
    }
  }, [localVideoRef, roomId]); // Dependency array includes localVideoRef and roomId

  // Render the component
  return (
    <div className="flex justify-center items-center h-screen">
      {/* Container for the local and remote video feeds */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h2>Your Video</h2>
          <Webcam
            ref={localVideoRef} // Set ref to access the Webcam component
            audio={false} // Disable audio capture
            width={400} // Set video width
            height={300} // Set video height
          />
        </div>
        <div>
          <h2>{peerUsername ? `${peerUsername}'s Video` : 'Waiting for opponent...'}</h2>
          <video
            ref={remoteVideoRef} // Set ref to access the video element
            autoPlay // Enable autoplay for the video element
            playsInline // Ensure video plays inline on mobile devices
            width={400} // Set video width
            height={300} // Set video height
          />
        </div>
      </div>
    </div>
  );
};

export default GameRoom; // Export the component for use in other parts of the application

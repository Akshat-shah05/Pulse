import { useState, useEffect } from 'react';
import { getSession } from 'next-auth/react';
import socket from '../../../lib/socket';

const Multiplayer = () => {
  const [username, setUsername] = useState<string>('');
  const [opponent, setOpponent] = useState<string>('');
  const [gameState, setGameState] = useState('idle');
  const [timer, setTimer] = useState(3);

  useEffect(() => {
    const fetchUser = async () => {
      const session = await getSession();
      if (session) {
        setUsername(session.user?.name as string);
      }
    };

    fetchUser();

    socket.on('receiveGameRequest', (data) => {
      if (data.toUsername === username) {
        setOpponent(data.fromUsername);
        setGameState('requestReceived');
      }
    });

    socket.on('startGame', (data) => {
      if (data.toUsername === username || data.fromUsername === username) {
        setGameState('playing');
        setTimer(3);
        const countdown = setInterval(() => {
          setTimer((prev) => {
            if (prev > 1) return prev - 1;
            clearInterval(countdown);
            return 1;
          });
        }, 1000);
      }
    });

    return () => {
      socket.off('receiveGameRequest');
      socket.off('startGame');
    };
  }, [username]);

  const sendGameRequest = async (toUsername: string) => {
    await fetch('/api/multiplayer/game-request', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ toUsername }),
    });

    socket.emit('sendGameRequest', { toUsername, fromUsername: username });
  };

  const acceptGameRequest = () => {
    socket.emit('acceptGameRequest', { toUsername: opponent, fromUsername: username });
  };

  return (
    <div>
      {gameState === 'idle' && (
        <div>
          <input
            type="text"
            placeholder="Enter opponent's username"
            value={opponent}
            onChange={(e) => setOpponent(e.target.value)}
          />
          <button onClick={() => sendGameRequest(opponent)}>Send Game Request</button>
        </div>
      )}

      {gameState === 'requestReceived' && (
        <div>
          <p>{opponent} has challenged you to a game!</p>
          <button onClick={acceptGameRequest}>Accept</button>
        </div>
      )}

      {gameState === 'playing' && (
        <div>
          <p>Game starting in: {timer}</p>
          {/* Add webcam components and game logic here */}
        </div>
      )}
    </div>
  );
};

export default Multiplayer;
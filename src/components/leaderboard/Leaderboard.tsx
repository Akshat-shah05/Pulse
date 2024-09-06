// components/leaderboard/Leaderboard.tsx
'use client'
import React from 'react';
import Navbar2 from '../navbar2/Navbar2';

interface User {
  username: string;
  pushupsAllTime: number;
}

interface LeaderboardProps {
  users: User[];
}

const Leaderboard: React.FC<LeaderboardProps> = ({ users }) => {
  return (
    <>  
        <Navbar2 />
        <div className="flex flex-col items-center p-6 bg-background min-h-screen text-primary">
            <h1 className="text-4xl font-bold mb-8">Leaderboard</h1>
            <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg overflow-hidden">
                <table className="w-full border-collapse">
                <thead>
                    <tr className="bg-gray-800 text-white">
                    <th className="py-3 px-6 text-left">Rank</th>
                    <th className="py-3 px-6 text-left">Username</th>
                    <th className="py-3 px-6 text-left">Pushups All Time</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, index) => (
                    <tr key={user.username} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-gray-100'}>
                        <td className="py-3 px-6">{index + 1}</td>
                        <td className="py-3 px-6">{user.username}</td>
                        <td className="py-3 px-6">{user.pushupsAllTime}</td>
                    </tr>
                    ))}
                </tbody>
                </table>
            </div>
        </div>
    </>
  );
};

export default Leaderboard;

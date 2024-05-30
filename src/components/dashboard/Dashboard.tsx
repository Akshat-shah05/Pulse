'use client';
import Navbar from "../navbar/Navbar";

// props for the username
interface userProps {
  username: string | null | undefined
};

// dashboard component, accepts username from top levle page.tsx
const Dashboard = ({username}: userProps) => {
  // returns the Navbar alongside a welcome message. this is the entire dashboard page. LOTS TO COME!
  return (
    <>
      <div className="h-screen bg-black">
        <Navbar username={username}/>
        <h1 className="text-white"> Welcome {username}</h1>
      </div>
    </>
  )
}

export default Dashboard

/*
<Logout />
            <Button variant="outline"> Test Button </Button>
            <p className="text-white"> Hello {username} </p>

*/
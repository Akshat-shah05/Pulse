import Leaderboard from '@/components/leaderboard/Leaderboard';
import Navbar from '@/components/navbar/Navbar';
import db from "@/lib/db";
import { getServerSession } from 'next-auth';

const page = async () => {
  const session = await getServerSession();
  let email = session?.user?.email;

  // Explicitly define the type for users
  let users: { username: string; pushupsAllTime: number }[] = [];

  if (email) {
    const userList = await db.user.findMany({
      orderBy: {
        pushupsAllTime: 'desc',
      },
      select: {
        username: true,
        pushupsAllTime: true,
      }, 
    });
    users = userList;
  }

  return (
    <>
        <Leaderboard users={users} />
    </>
  );
};

export default page;
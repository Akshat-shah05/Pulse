import Dashboard from '@/components/dashboard/Dashboard';
import { getServerSession } from "next-auth";
import { db } from '../../lib/db';

const page = async () => {
    // get the current username
    const user = await getServerSession();

    // Get the email, check if email exists
    let email = user?.user?.email;

    // if email exists, replace email with the associated username
    if(email) {
        const person = await db.user.findUnique({
            where: {email: email}
        })
        email = person?.username;
    }

    // return main dashboard component
  return (
    <>
        <Dashboard username={email}/>
    </>
  );
}

export default page;
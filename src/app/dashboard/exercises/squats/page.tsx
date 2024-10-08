import SquatPage from '@/components/exercises/squats/SquatPage';
import { getServerSession } from 'next-auth';
import { db } from '@/lib/db';

const page = async () => {
    const user = await getServerSession();

    // Get the email, check if email exists
    let email = user?.user?.email;
    console.log(email);

    // if email exists, replace email with the associated username
    if(email) {
        const person = await db.user.findUnique({
            where: {email: email}
        })
        email = person?.username;
    }
    console.log(email)

    return (
        <SquatPage username={email}/>
    )
}

export default page
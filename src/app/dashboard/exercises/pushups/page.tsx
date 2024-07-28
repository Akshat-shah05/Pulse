import PushUpPage from '@/components/exercises/pushup/PushupPage';
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
        <PushUpPage username={email}/>
    )
}

export default page
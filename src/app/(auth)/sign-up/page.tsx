import SignUpForm from '@/components/form/SignUpForm';
import { motion } from 'framer-motion'
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

const page = async () => {
    const session = await getServerSession();
    if (session) {
        redirect("/dashboard")
    }

    return (
        <div className="h-screen flex flex-row justify-center items-center bg-black">
            <SignUpForm />
        </div>
    )
}

export default page;
import SignInForm from '@/components/form/SignInForm';
import { motion } from 'framer-motion'
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

const page = async () => {
    const session = await getServerSession();
    if (session) {
        redirect("/dashboard")
    }
    return (
        <>
            <div className = 'h-screen flex flex-col justify-center items-center bg-background'>
                <h1 className="bg-background text-6xl text-primary flex flex-row justify-center item-center pb-10 text-primary"> Welcome! Please Sign in </h1>
                <SignInForm />
            </div>
        </>
    )
}

export default page;
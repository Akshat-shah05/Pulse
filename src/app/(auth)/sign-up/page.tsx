import SignUpForm from '@/components/form/SignUpForm';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

// sign up page, redirect to dashboard if user session already active
const page = async () => {
    const session = await getServerSession();
    if (session) {
        redirect("/dashboard")
    }

    return (
        <div className="h-screen flex flex-row justify-center items-center bg-background">
            <SignUpForm />
        </div>
    )
}

export default page;
import SignInForm from '@/components/form/SignInForm';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

// sign-in page, if user already signed-in (cache counted too), redirect to dashboard
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
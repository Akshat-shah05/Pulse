'use client'

import SignUpForm from '@/components/form/SignUpForm';
import { motion } from 'framer-motion'

const page = () => {
    return (
        <div className="h-screen flex flex-row justify-center items-center bg-black">
            <SignUpForm />
        </div>
    )
}

export default page;
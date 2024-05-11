'use client'

import SignInForm from '@/components/form/SignInForm';
import { motion } from 'framer-motion'

const page = () => {
    return (
        <motion.div 
            className = 'h-screen flex flex-row justify-center items-center bg-black'
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            transition={{duration: 2}}
        >
            <SignInForm />
        </motion.div>
    )
}

export default page;
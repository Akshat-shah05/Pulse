'use client'

import SignUpForm from '@/components/form/SignUpForm';
import { motion } from 'framer-motion'

const page = () => {
    return (
        <motion.div className="h-screen flex flex-row justify-center items-center bg-black"
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            transition={{duration: 2}}
        >
            <SignUpForm />
        </motion.div>
    )
}

export default page;
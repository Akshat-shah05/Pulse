'use client'
import { motion } from 'framer-motion'
import Link from "next/link";

// Home page where user first lands --> motion tags are from framer-motion for animatios
export default function Home() {
  const text = "Welcome to Pulse"
  const fade = "Click to Continue"  

  return (
    <div className="bg-background ">
      <motion.main 
        className="h-screen w-full flex flex-col bg-background justify-center items-center text-9xl text-primary font-sans tracking-widest"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5 }}
      >
        { text }
        <Link href="/sign-in">
          <motion.div 
            className="w-full flex justify-center text-white text-xl mt-32 tracking-wider"
            animate={{ scale: [1, 1.2, 1], color: ['#ffffff', '#ff0080', '#ffffff']}} // Animate the scale property to create a pulsing effect
            transition={{ duration: 1.5, repeat: Infinity, delay: 1.5 }} // Set the duration and repeat the animation infinitely
          >
            {fade}
          </motion.div>
        </Link>
        
      </motion.main>
    </div>
  );
}

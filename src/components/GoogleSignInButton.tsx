// Component for the sign in button for google

import { Button } from './ui/button';
import { ReactNode } from 'react'

interface GoogleSignInButtonProps {
    children: ReactNode
}

// Update: Removed React FC - don't need it
const GoogleSignInButton = ({ children }: GoogleSignInButtonProps) => {
    const loginWithGoogle = () => console.log('login with google');

    return (
        <Button onClick={loginWithGoogle} className='mx-auto text-primary my-4 bg-background border-primary border-2 flex w-full items-center justify-evenly'>
            {children}
        </Button>
    );
}

export default GoogleSignInButton;

'use client';

import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import Link from 'next/link';
import GoogleSignInButton from '../GoogleSignInButton';
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation';

// Code is basically the same as the SignUpForm, except the zod schema is different

const FormSchema = z.object({
    email: z.string().min(1, 'Email is required').email('Invalid email'),
    password: z
        .string()
        .min(1, 'Password is required')
        .min(8, 'Password must have than 8 characters'),
});


const SignInForm = () => {
  const router = useRouter()
    // Create form
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  // onSubmit function 
  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    console.log("Signed In")
  }

  // Taken mostly from the ShadCN documentation 
  return (
    <Form {...form}>
        <div className='w-6/12'>
            <form onSubmit={form.handleSubmit(onSubmit)} className='w-full'>
                <div className='space-y-5 text-red-100'>
                    <FormField
                    control={form.control}
                    name='email'
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                            <div className="text-black"><Input placeholder='mail@example.com' {...field} /></div>
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                    <FormField
                    control={form.control}
                    name='password'
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                            <div className="text-black">
                                <Input
                                type='password'
                                placeholder='Enter your password'
                                {...field}
                                />
                            </div>
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                </div>
                <Button className='w-full bg-black border-red-100 border-2 mt-6' type='submit'>
                    Sign in
                </Button>
            </form>
            <div className='mx-auto my-4 flex text-pink-200 w-full items-center justify-evenly before:mr-4 before:block before:h-px before:flex-grow before:bg-stone-400 after:ml-4 after:block after:h-px after:flex-grow after:bg-stone-400'>
            or
            </div>
            <GoogleSignInButton>Sign in with Google</GoogleSignInButton>
            <p className='text-center text-sm text-red-100 mt-2'>
            If you don&apos;t have an account, please&nbsp;
            <Link className='text-blue-500 hover:underline' href='/sign-up'>
                Sign up
            </Link>
            </p>
        </div>
    </Form>

  )


}

export default SignInForm
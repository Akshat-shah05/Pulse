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
    // Create form
  const router = useRouter()
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  // onSubmit function 
  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    console.log(values.email, values.password)
    
    const response = await signIn('credentials', {
        email: values.email,
        password: values.password, 
        redirect: false
    })
    if(!response?.error) {
        router.push('/dashboard')
        router.refresh()
    } else {
        form.reset()
    }
  }

  // Taken almost entirely from the ShadCN documentation for zod forms
  return (
    <Form {...form}>
        <div className='w-6/12'>
            <form onSubmit={form.handleSubmit(onSubmit)} className='w-full'>
                <div className='space-y-5 text-primary'>
                    <FormField
                    control={form.control}
                    name='email'
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                            <div className="text-black"><Input placeholder='mail@example.com' {...field} /></div>
                        </FormControl>
                        <FormMessage/>
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
                <Button className='w-full bg-background border-primary text-primary border-2 mt-6' type='submit'>
                    Sign in
                </Button>
            </form>
            <div className='mx-auto my-4 flex text-primary w-full items-center justify-evenly before:mr-4 before:block before:h-px before:flex-grow before:bg-stone-400 after:ml-4 after:block after:h-px after:flex-grow after:bg-stone-400'>
            or
            </div>
            <GoogleSignInButton>Sign in with Google</GoogleSignInButton>
            <p className='text-center text-sm text-primary mt-2'>
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
'use client';
// Tells Next.js to use a client component

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from 'zod'
 
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import Link from "next/link";
import GoogleSignInButton from "../GoogleSignInButton";
import { useRouter } from "next/navigation";

// Set Form Schema so that we have the correc types for everything
const FormSchema = z
  .object({
    username: z.string().min(1, 'Username is required').max(100),
    email: z.string().min(1, 'Email is required').email('Invalid email'),
    // password requirement management
    password: z
      .string()
      .min(1, 'Password is required')
      .min(8, 'Password must have than 8 characters'),
    confirmPassword: z.string().min(1, 'Password confirmation is required'),
  })
  // Checking if passwords match
  .refine((data: any) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Password do not match',
  });

// SignUp Form Component --> Takes no props
const SignUpForm = () => {
    const router = useRouter()
    // useForm
    // Recall --> Zod is a schema verification library --> z.infer<typeof FormSchema> tells useForm the schema
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        // set defaults
        defaultValues: {
            username: '',
            email: '',
            password: '',
            confirmPassword: '',
        }
    })

    // handle submits - add auth here
    const onSubmit = async (values: z.infer<typeof FormSchema>) => {
        const response = await fetch('/api/user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: values.username,
                email: values.email,
                password: values.password
            })
        })

        if (response.ok) {
            router.push('/sign-in')
        } else {
            console.error("Registration failed")
        }

    };

    return (
        // Most of the form component taken from ShadCn's documentation - https://ui.shadcn.com/docs/components/form 
        <Form {...form}>
            <div className="w-6/12 bg-background">
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className='space-y-5 text-primary'>
                    <FormField
                        control={form.control}
                        name='username'
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>Username</FormLabel>
                            <FormControl>
                                <div className="text-black"> <Input placeholder='johndoe' {...field} /> </div>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name='email'
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <div className="text-black"> <Input placeholder='mail@example.com' {...field} /> </div>
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
                    <FormField
                        control={form.control}
                        name='confirmPassword'
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>Re-Enter your password</FormLabel>
                            <FormControl>
                            <div className="text-black">
                                <Input
                                    placeholder='Re-Enter your password'
                                    type='password'
                                    {...field}
                                />
                            </div>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                    </div>
                    <Button className='w-full bg-background border-primary border-2 mt-6 text-primary' type='submit'>
                    Sign up
                    </Button>
                </form>
                <div className='mx-auto my-4 text-primary flex items-center justify-evenly before:mr-4 before:block before:h-px before:flex-grow before:bg-stone-400 after:ml-4 after:block after:h-px after:flex-grow after:bg-stone-400'>
                    or
                </div>
                <GoogleSignInButton>Sign up with Google</GoogleSignInButton>
                <p className='text-center text-primary text-sm text-gray-600 mt-2'>
                    If you have an account, please&nbsp;
                    <Link className='text-blue-500 hover:underline' href='/sign-in'>
                    Sign in
                    </Link>
                </p>
            </div>
        </Form>
    )
}

export default SignUpForm
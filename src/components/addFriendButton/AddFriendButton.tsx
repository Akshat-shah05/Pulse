import React, { Dispatch, SetStateAction, useState } from 'react';
import * as z from "zod";
import { Button } from '../ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

// Props that will be passed to the button, handling for opening and closing the input field for adding a friend
interface ButtonProps {
  open: boolean,
  setOpen: Dispatch<SetStateAction<boolean>>,
};

// Props for accepting the username from Navbar.tsx
interface userProps {
  username: string | null | undefined
};

const AddFriendButton = ({username}: userProps) => {
  // check if input is open or not
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  // close input on click
  const handleClick = () => {
    setModalOpen(!modalOpen);
    console.log(username);
  }

  // component 
  return (
    <div className="flex flex-col"> 
        {modalOpen 
        ? 
        <div className="flex flex-row">
          <AddFriendForm open={modalOpen} setOpen={setModalOpen} username={username}/>
        </div>
        : 
        <Button variant="secondary" size="sm" onClick={handleClick}> Add a Friend </Button>
        }
    </div>
  )
}

// Zod form schema
const FormSchema = z.object({
    friendUsername: z.string(),
    username: z.any()
});

// Intersection between props - clean solution to types being annoying asl
type Props = ButtonProps & userProps;

// component for form
const AddFriendForm = ({open, setOpen, username}: Props) => {

  // zod form
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      friendUsername: "",
      username: username // username is the default value (current session username), there is not set form for it, just need it to pass it to the route
    },
  });

  // zod submit, sends POST request to /api/friends/add to add a friend
  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    setOpen(!open)
    const response = await fetch("/api/friends/add", {
      method: "POST", 
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        friend: values.friendUsername, // username of the friend that you are adding from input
        username: values.username // username received as props, current session username
      })
    });

    if(response.ok) {
        // Make this specific to the response message of course, this is is fine for now though
        form.reset();
        alert("Success!");
    } else {
        // Use react alert to make an error pop up, and then reset form
        // Make this specific to the response message of course, this is is fine for now though
        form.reset();
        alert("Failure");
    }
  }

  // Zod Form
  return (
    <Form {...form}>
      <div className="flex flex-row items-center">
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex flex-row items-center">
            <FormField
              control={form.control}
              name='friendUsername'
              render={({ field }) => (
              <FormItem>
                  <FormControl>
                      <div className="text-black"> <Input placeholder='add a friend'  className="w-100" {...field} /> </div>
                  </FormControl>
                  <FormMessage />
              </FormItem>
              )}
            />
            <Button variant="ghost" size="sm" className="px-6 ml-6 mr-6" type='submit'>
            Add
            </Button>
          </div>
        </form>
      </div>
    </Form>
  )
}

export default AddFriendButton
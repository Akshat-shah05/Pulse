import React, { Dispatch, SetStateAction, useState } from 'react'
import * as z from "zod"
import { Button } from '../ui/button'
import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form'
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

interface ButtonProps {
  open: boolean,
  setOpen: Dispatch<SetStateAction<boolean>>
}

interface userProps {
  username: string | null | undefined
}

const AddFriendButton = ({username}: userProps) => {
  const [modalOpen, setModalOpen] = useState<boolean>(false)

  const handleClick = () => {
    setModalOpen(!modalOpen)
  }


  return (
    <div className="flex flex-col"> 
        {modalOpen 
        ? 
        <div className="flex flex-row">
          <AddFriendForm open={modalOpen} setOpen={setModalOpen}/>
        </div>
        : 
        <Button variant="secondary" size="sm" onClick={handleClick}> Add a Friend </Button>
        }
    </div>
  )
}

const FormSchema = z.object({
    friendUsername: z.string(),
});

const AddFriendForm = ({open, setOpen}: ButtonProps, {username}: userProps) => {
  const router = useRouter()
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      friendUsername: ""
    },
  })

  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    console.log(values.friendUsername)
    setOpen(!open)
    const response = await fetch("/api/friends/add", {
      method: "POST", 
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        friend: values.friendUsername,
        user: username
      })
    })

    if(response.ok) {
        form.reset()
    } else {
        // Use react alert to make an error pop up, and then reset form
        form.reset()
    }
  }

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
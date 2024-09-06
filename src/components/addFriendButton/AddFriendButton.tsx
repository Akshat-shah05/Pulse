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
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal, CheckCircle, XCircle } from 'lucide-react';

// Props for controlling the input field visibility and alert display
interface ButtonProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  setAlertShown: Dispatch<SetStateAction<boolean>>;
  setAlertMessage: Dispatch<SetStateAction<string>>;
  setIsSuccess: Dispatch<SetStateAction<boolean>>;
}

// Props for receiving the username from another component (Navbar.tsx)
interface userProps {
  username: string | null | undefined;
}

const AddFriendButton = ({ username }: userProps) => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [alertShown, setAlertShown] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string>("");
  const [isSuccess, setIsSuccess] = useState<boolean>(true);

  // Function to toggle the modal open/close when the button is clicked
  const handleClick = () => {
    setModalOpen(!modalOpen);
  };

  return (
    <div className="flex flex-col">
      {/* Render the alert outside the modal so it persists after form close */}
      {alertShown && (
          <div className={`fixed top-5 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-md`}>
            <Alert variant={isSuccess ? "default" : "destructive"}>
              {isSuccess ? <CheckCircle className="h-4 w-4" /> : <XCircle className="h-4 w-4" />}
              <AlertTitle>{isSuccess ? "Success!" : "Error!"}</AlertTitle>
              <AlertDescription>{alertMessage}</AlertDescription>
            </Alert>
          </div>
      )}

      {modalOpen ? (
        <div className="flex flex-row items-center">
          <AddFriendForm
            open={modalOpen}
            setOpen={setModalOpen}
            username={username}
            setAlertShown={setAlertShown}
            setAlertMessage={setAlertMessage}
            setIsSuccess={setIsSuccess}
          />
          <Button variant="ghost" className="mr-5" size="xs" onClick={handleClick}>
            X
          </Button>
        </div>
      ) : (
        <Button variant="rainbow" size="sm" onClick={handleClick}>
          Add a Friend
        </Button>
      )}
    </div>
  );
};

// Zod form schema for validation
const FormSchema = z.object({
  friendUsername: z.string().min(1, "Friend username is required."),
  username: z.any(),
});

// Type intersection for props to pass between components
type Props = ButtonProps & userProps;

// Component for the actual Add Friend form
const AddFriendForm = ({
  open,
  setOpen,
  username,
  setAlertShown,
  setAlertMessage,
  setIsSuccess,
}: Props) => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      friendUsername: "",
      username: username,
    },
  });

  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    setOpen(!open);
    try {
      const response = await fetch("/api/friends/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          friend: values.friendUsername,
          username: values.username,
        }),
      });

      if (response.ok) {
        setIsSuccess(true);
        setAlertMessage("Friend added successfully!");
      } else {
        setIsSuccess(false);
        setAlertMessage("Failed to add friend. Please try again.");
      }
    } catch (error) {
      setIsSuccess(false);
      setAlertMessage("An error occurred. Please try again.");
    }

    setAlertShown(true);
    form.reset();

    setTimeout(() => {
      setAlertShown(false);
    }, 3500);
  };

  return (
    <Form {...form}>
      <div className="flex flex-row items-center">
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex flex-row items-center">
            <FormField
              control={form.control}
              name="friendUsername"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="text-black">
                      <Input placeholder="add a friend" className="w-100" {...field} />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button variant="rainbow" size="sm" className="px-6 ml-6 mr-1" type="submit">
              Add
            </Button>
          </div>
        </form>
      </div>
    </Form>
  );
};

export default AddFriendButton;

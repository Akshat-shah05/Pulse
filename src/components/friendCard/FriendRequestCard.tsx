'use-client'
import React from 'react'
import { Button } from '../ui/button'
import { Card } from '../ui/card'
import { CheckIcon, XIcon } from '../icons/Icons'

interface friendProps {
    friend: string | undefined,
    username: string 
}

const FriendRequestCard = ({friend, username}: friendProps) => {

    const handleAccept = async () => {
        const response = await fetch("/api/friends/accept", {
            method: "POST", 
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              friend: friend,
              currentUser: username 
            })
        });
      
        if(response.ok) {
            alert("Success!");
            window.location.reload()
        } else {
            alert("Failure");
        }
    }

    const handleDecline = async () => {
        const response = await fetch("/api/friends/decline", {
            method: "POST", 
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              friend: friend,
              currentUser: username 
            })
        });
      
        if(response.ok) {
            alert("Success!");
            window.location.reload()
        } else {
            alert("Failure");
        }
    }

    return (
        <>
            <Card className="p-4 flex items-center gap-4 border-primary">
                <div className="flex flex-row items-center w-full">
                    <div className="font-medium w-full">{friend}</div>
                    <div className="w-full flex flex-row justify-end">
                        <Button variant="rainbow" size="xs" className="px-6 ml-6 mr-1 flex-end" type='submit'>
                            <div><CheckIcon onClick={handleAccept}/></div>
                        </Button>
                        <Button variant="rainbow" size="xs" className="px-6 ml-2 mr-1 flex-end" type='submit'>
                            <div><XIcon onClick={handleDecline} /></div>               
                        </Button>
                    </div>
                </div> 
            </Card>
        </>
    )
}

export default FriendRequestCard
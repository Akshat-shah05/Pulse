'use-client'
import React from 'react'
import { Card } from '../ui/card'

interface friendProps {
    friend: string | undefined
    username: string
}

const FriendCard = ({friend, username}: friendProps) => {
  return (
    <>
        <Card className="p-4 flex items-center gap-4 border-primary">
            <div className="flex-1">
                <div className="font-medium">{friend}</div>
            </div>
        </Card>
    </>
  )
}

export default FriendCard
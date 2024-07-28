'use-client'
import React from 'react'
import { Card } from '../ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar'

interface friendProps {
    friend: string | undefined
}

const FriendCard = ({friend}: friendProps) => {
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
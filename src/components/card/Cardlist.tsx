import React from 'react'
import { DumbbellIcon, TableIcon, SquircleIcon, HandIcon, ImageUpIcon, MoveUpIcon, SearchIcon, SquareIcon } from '../icons/Icons'
import { Card, CardContent } from '../ui/card'
import Link from 'next/link'


const CardList = () => {
  return (
    <main className="container grid grid-cols-1 gap-6 px-4 py-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        <Link href="/dashboard/exercises/pushups">
            <Card>
                <CardContent className="flex flex-col items-center justify-center gap-4 pt-12">
                    <TableIcon className="h-12 w-12 text-primary" />
                    <h3 className="text-lg font-medium">Pushups</h3>
                </CardContent>
            </Card>
        </Link>
        <Link href="/dashboard/exercises/squats">
          <Card>
            <CardContent className="flex flex-col items-center justify-center gap-4 pt-12">
              <SquircleIcon className="h-12 w-12 text-primary" />
              <h3 className="text-lg font-medium">Squats</h3>
            </CardContent>
          </Card>
        </Link>
        <Card>
          <CardContent className="flex flex-col items-center justify-center gap-4 pt-12">
            <DumbbellIcon className="h-12 w-12 text-primary" />
            <h3 className="text-lg font-medium">Bicep Curls</h3>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex flex-col items-center justify-center gap-4 pt-12">
            <SquareIcon className="h-12 w-12 text-primary" />
            <h3 className="text-lg font-medium">Wall Sits</h3>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex flex-col items-center justify-center gap-4 pt-12">
            <MoveUpIcon className="h-12 w-12 text-primary" />
            <h3 className="text-lg font-medium">Sit Ups</h3>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex flex-col items-center justify-center gap-4 pt-12">
            <ImageUpIcon className="h-12 w-12 text-primary" />
            <h3 className="text-lg font-medium">Chin Ups</h3>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex flex-col items-center justify-center gap-4 pt-12">
            <ImageUpIcon className="h-12 w-12 text-primary" />
            <h3 className="text-lg font-medium">Pull Ups</h3>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex flex-col items-center justify-center gap-4 pt-12">
            <HandIcon className="h-12 w-12 text-primary" />
            <h3 className="text-lg font-medium">Handstands</h3>
          </CardContent>
        </Card>
      </main>
  )
}

export default CardList
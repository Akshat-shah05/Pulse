import React from 'react'
import { Button } from '../ui/button'

const cardData: { [key: string]: [string, string] } = {
    1: ["Pushups", "/exercises/pushups"], 
    2: ["Squats", "/exercises/squats"], 
    3: ["Sit Ups", "/exercises/situps"], 
    4: ["Pull Ups", "/exercises/pullups"], 
    5: ["Wall Sits", "/exercises/wallsits"], 
    6: ["Bicep Curls", "/exercises/curls"], 
    7: ["Handstands", "/exercises/handstand"], 
    8: ["Jumping Jacks", "/exercises/jjacks"]
}

const Card = () => {
  return (
    <div className="grid grid-cols-4 w-full p-6 place-items-center mt-10">
        {
            Object.keys(cardData).map((key) => {
                const [exerciseName, exerciseLink] = cardData[key];
                return (<div key={key}>
                    <a href={"/dashboard" + exerciseLink}>
                        <Button variant="rainbow" className="mb-2 text-2xl font-bold tracking-tight text-white h-40 w-80 mb-6">
                            {exerciseName}
                        </Button>
                    </a>
                </div>)
            })
        }
    </div>
    
  )
}

export default Card
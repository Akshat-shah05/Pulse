# Pulse: 🏋️🌟 The Most Fun Competitive Fitness Application 🔥💪

### Watch a short little demo here :) https://youtu.be/GqNxkKXEF_w
(Video demonstrating Multiplayer function coming soon)

## Inspiration 💡💭
The inspiration for this project was really just wanting a tool that would motivate me to workout, EVEN during those days where I really don't want to go to the gym. Recently, with working so much and being burntout, the gym has gone from something I did for fun and growth, to another chore that I feel forced/obligated to do. I wanted to use my passion for programming to create a solution to this motivation issue. If I had a system that would let me workout with others (my favourite part of goint to the gym), from home, I could stay active even on those not-so-good days. This led to the eventual production of Pulse, an application where you can compete against your friends in real-time exercises to workout from the comfort of you home, perfect for those days where you really can't push yourself to go to the gym.

## Features ⚙️
- Authentication with multiple social logins + client credential jwt, handled with Next Auth
- Fitness counters for 8 different exercises
  - Pushups
  - Pullups
  - Situps
  - Chinups
  - Squats
  - Wall sits
  - Bicep Curls
  - Handstands
- Multiplayer mode - Compete against your friends!
- Leaderboard to see how you've been progressing compared to your friends for motivation!
- Add friend functionality 
- Saves user data to a PostgreSQL database, powered by Prisma

## Newly Added Features / Features in Progress
- Completed the game room system where users match into a room to compete
- Working on Adding real-time work out suggestions as you complete your exercises

## Technologies 💻🔐
- Next.js / React
- PostgreSQL / Prisma
- Tailwind + ShadCN
- Next Auth
- Tensorflow (pose detection)
- Socket.io + Node for multiplayer

## Challenges I ran into 💪🤔

Major Challenges: 
- Figuring out how to make a real-time game-like system with sockets
  1. Sockets were not persisting between /dashboard and /multiplayer
     - to fix this I had to create a getSocket() function that makes a shared singleton socket
  3. Troubleshooting was difficult since at the start I didn't perfectly understand the socket methods (.on, .join, .emit)
  4. Handling session with sockets, since getting the session requires server components, but sockets run only in client components (with socketio-client), so there was a lot of restructuring
  5. Functionality for setting online users
       - I first just stored users into a hashmap, but this only saves user instances on ONE Port
       - Thus a user on PORT 3001 would not know that someone else was active on PORT 3000
       - To fix this I created a new Table that stores all currently active users with their socket ID's, this shared state allows connections across Ports
       - Ran into a CORS issue with this (of course :/ ), so I had to fix that
  6. Struggled to figure out how I can have more than 2 users (I had it hard coded so that if PORT 3000 was used, it would go to 3001, but what about a third user?)
       - To fix this I added a recursive function in the server.js that keeps restarting the server and incrementing the PORT until it finds an open port

Minor Challenges:
- Reading through loads of documentation to set up my first NextJS + ShadCN application
- Figuring out how to use Prisma 
- Learning how to work with ShadCN properly as its not the same as other component libraries I've used such as ChakraUI (it isn't in the node modules, rather you install actual components in @/components/ui
- Though authentication would be hard, but nextAuth is  easy to use
  
## What I learned 🧠
- This project was full of learning, and a lot of firsts
- The most significant learning was using ML libraries like tensorflow to develop my own pose detection models for pushups + other exercises
- Another big learning was understanding how to properly make use of a DB for client credential JWT based logins
- Learned a lot about JWT
- Learned how to implement real-time connections between "players" with web sockets
  - Designed a wireframe system for this
  - User makes game request to friend -> req goes to api endpoint -> friend verified in db -> socket emits request -> friend accepts -> socket emits reponse -> both players moved to multiplayer -> game start -> socket disconnects

## Next steps for this project 📈
- More accurate pose detection
- Adding more "game modes" to increase engagement
- Adding a motivational chatbot that keeps you working
- Adding reminders to the email
- Basic things like better auth protocols (verifying, mfa etc.)

## Try it out!
Get Repository on your device
```
git clone https://github.com/Akshat-shah05/Pulse.git
cd Pulse
```

Install dependencies
```
npm install
```

Add all necessary API Keys
```
DATABASE_URL
NEXTAUTH_URL
NEXTAUTH_SECRET
```

Run Application
```
npm run dev
```

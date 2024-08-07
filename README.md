# Pulse: 🏋️🌟 The Most Fun Competitive Fitness Application 🔥💪

### Dashboard - image soon

### Friends - image soon

### Exercise AI - image soon

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

## Technologies 💻🔐
- Next.js / React
- PostgreSQL / Prisma
- Tailwind + ShadCN
- Next Auth
- Tensorflow (pose detection)
- Socket.io + Node for multiplayer

## Challenges I ran into 💪🤔
- Reading through loads of documentation to set up my first NextJS + ShadCN application
- Figuring out how to use Prisma 
- Learning how to work with ShadCN properly as its not the same as other component libraries I've used such as ChakraUI (it isn't in the node modules, rather you install actual components in @/components/ui
- Though authentication would be hard, but nextAuth is  easy to us
- Figuring out how to make a real-time game-like system with sockets
  - Followed a LOT of documentation + watched a lot of videos on how to correctly set up sockets with nextJS
  
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


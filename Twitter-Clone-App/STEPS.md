# Project Flow

## Backend - node, express

1. Project Setup - mongodb databse
2. Authentication - jwt
3. User Controllers
4. Post Controllers
5. Notification Controllers
6. Test Controllers - postman / thunder client

## UI Dssign - React, tailwind css

1. Hard Coded Data
2. React Route DOM pages, links and navigation

## Connect Backend and Frontend

1. Queries - data fetching, caching, updating and invalidating queries
2. Mutations
3. Hooks -custom hooks

## Deploy

1. Setup the server
2. render.com -free tools

# Steps

## Setup

1. npm create vite@latest with project name frontend
   -> npm install & npm run dev
2. run npm init -y in the root not in the cd backend
   -> install dependencies - express mongoose cors dotenv bcryptjs jsonwebtoken http-status-c
   odes cloudinary(cloud to manage media) cookie-parser(get cookies from request) / multer? body-parser? validator?
   -> install nodemon as dev dependencies
3. change main, add,type dev and start in package,json
   -> "main": "backend/server.js",
   -> "type": "module",
   -> "dev": "nodemon backend/server.js",
   -> "start": "node backend/server.js",

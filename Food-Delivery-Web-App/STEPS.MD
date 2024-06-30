# Steps In Creating Food Delivery App

## 1. Create react project

1. Create vite
   -> npm create vite@latest frontend
2. Navigate to frontend foder and install dependencies
   -> npm install
3. Install react router dom package
   -> npm install react-router-dom
4. Delete App.css file and content in App.jsx & index.css
5. Create App component in App.jsx
6. Set the default style in index.css
7. Change the title in html.css to 'Food Deivery'

## 2. Create folder structure for React

1. Create a few folders in src foler
   -> components folder
   -> pages folder
2. Add all the frontend assets (food img, logo, etc) in the assets folder
3. Create assets.js file
   -> import and name all the asset (eg: import logo from './logo.png')
   -> create objects that contain the assests and export them (eg: export const assets = {logo,})
   -> if want to use, can just impport assets.js and (eg: assests.logo)

## 3. Navbar

### 3a. Setup Navbar component

1. Create navbar folder in the component folder
2. Create Navbar.jsx file in navbar folder
3. Create Navbar.css file in navbar folder
4. Import Navbar.css in Navbar.jsx
   -> import './Navbar.css'
5. Create a div in Navbar,jsx and add className 'navbar
6. Create a div with className 'app' in the App component and mount the navbar component inside it

### 3b. Create Navbar

1. Set the main div class to 'navbar
1. Create the structure of the navbar by dividing into 3 class; 'logo', 'navbar-menu' and 'navbar-right'

### 3c. Style Navbar

1. Set the app width to 80% in index.css
2. Style the navbar 'logo'
   -> target logo class using .navbar .logo instead of direct .logo to make it specific and not affecting other class with the same name (applied to assets)
3. Style 'navbar-menu'
   -> remove list bullet points with list-style: none
   -> create gap of each of the item with gap: 20px
   -> import custom fonts (google fonts: outfit)
4. Style navbar right
   -> style the sign in button and create hover effect
   -> style the menu list when the state class changed to 'active' after clicked
   -> style 'dot' class (visible when there are items in cart)

## Setup pages

1. Create Home, Cart and PlaceOrder folders in page folder
2. Create page components files for each folder
3. Crate css files for each folder

## Setup Router for each page component

1. in main.jsx
   -> import {browserRouter} from 'react-router-dom'
   -> Replace React.Strictmode tag with BrowserRouter tag
2. Setup the routes in App.jsx
   -> Use Router tag that act as container to wrap all the routes in the Route tag
   -> Setup the path and element(component) in the Route tag for each Home, Cart and PlaceOrder page and make sure to import the pages too (eg: <Route path="/" element={<Home />} />)

## Header

### Setup Header component

1. Create Header folder in the components folder
2. Create Header.jsx and Header.css file in Header folder
3. Import the Header.css in the Header.jsx

### Create Header

1. Set the main div class to 'header
2. Create the header content

### Style Header

1. Copy header_img.png from assets and paste in public folder
2. Style the header class
   -> import background image using the header_image.png. No need to provide full path bcs it is in public folder (eg: background: url('/header_img.png') no-repeat;)
   -> set the class to position: relative
3. Style header-contents class 
4. create fadeIn in animation using @keyframes in index.css and add the animation in header-contents

## Home page

1. Mount Header component in the home page

### 1a. Create Home page component

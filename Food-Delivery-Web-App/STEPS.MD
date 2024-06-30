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

## 3. Navbar component

### 3a. Setup Navbar component

1. Create navbar folder in the component folder
2. Create Navbar.jsx file in navbar folder
3. Create Navbar.css file in navbar folder
4. Import Navbar.css in Navbar.jsx
   -> import './Navbar.css'
5. Create a div in Navbar,jsx and add className 'navbar
6. Create a div with className 'app' in the App component and mount the navbar component inside it

### 3b. Create Navbar component

1. Set the main div class to 'navbar
1. Create the structure of the navbar by dividing into 3 class; 'logo', 'navbar-menu' and 'navbar-right'

### 3c. Style Navbar component

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

## 4. Setup pages

1. Create Home, Cart and PlaceOrder folders in page folder
2. Create page components files for each folder
3. Crate css files for each folder

## 5. Setup Router for each page component

1. in main.jsx
   -> import {browserRouter} from 'react-router-dom'
   -> Replace React.Strictmode tag with BrowserRouter tag
2. Setup the routes in App.jsx
   -> Use Router tag that act as container to wrap all the routes in the Route tag
   -> Setup the path and element(component) in the Route tag for each Home, Cart and PlaceOrder page and make sure to import the pages too (eg: <Route path="/" element={<Home />} />)

## 6. Header component

### 6a. Setup Header component

1. Create Header folder in the components folder
2. Create Header.jsx and Header.css file in Header folder
3. Import the Header.css in the Header.jsx

### 6b. Create Header componwnt

1. Set the main div class to 'header
2. Create the header content

### 6c. Style Header component

1. Copy header_img.png from assets and paste in public folder
2. Style the header class
   -> import background image using the header_image.png. No need to provide full path bcs it is in public folder (eg: background: url('/header_img.png') no-repeat;)
   -> set the class to position: relative
3. Style header-contents class
4. create fadeIn in animation using @keyframes in index.css and add the animation in header-contents

## 7. ExploreMenu component

### 7a. Setup ExploreMenu component

1. Create ExploreMenu component folder
2. Create ExploreMenu.jsx and Menu.css
3. Mount ExploreMenu component in Home page and import ExploreMenu.css in the ExploreMenu.jsx file

### 7b. Create ExploreMenu component

1. Import ExploreMenu.css and the menu_list arrays of objects from assets.js
2. The class of the root div is explore-menu
3. Create explore-menu-text and explore-menu-list class
4. Map the menu_list array with the index as the key
5. Create break line tag using hr tag
6. In explore-menu-list-item class, create a function that toggle the category state to the item name and change the class of the img tag to 'active'
7. The explore menu is used to filter the item by category when clicked

### 7c. Style ExploreMenu component

1. Make explore-menu-list can be scroll left to right
   -> overflow-x: scroll;
2. Hide the scroll panel
   -> .explore-menu-list::-webkit-scrollbar {
   display: none;
   }
3. Style the hr tag
4. Style the img 'active' class by adding border to show the img is highligted

## 8. Home page

### 8a. Create Home page

1. Mount Header and ExploreMenu component in the home page
2. Create category state and pass to ExploreMenu component as a prop
3. 

### 8b. Style Home page


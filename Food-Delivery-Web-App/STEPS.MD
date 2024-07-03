# Frontend

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
7. Change the title in html.css to 'Food Delivery'

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
3. Import ExploreMenu.css in the ExploreMenu.jsx file
4. Destructure the props in the component paramater

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

1. Mount Header and ExploreMenu component
2. Create category state and pass the state and its dispatch function to ExploreMenu component as a prop
3. Mount FoodDisplay component and pass the category state as prop

### 8b. Style Home page

## 9. Context

1. Create context file in src file

### 9a. StoreContext

1. Create StoreContext.jsx in context file
2. Set StoreContext as null in default
   -> export const StoreContext = createContext(null);
3. Create StoreContextProvider component to set up the Provider and the context value
   -> const StoreContextProvider = (props) => {
   const contextValue = {
   food_list,
   };
   return (
   <StoreContext.Provider value={contextValue}>
   {props.children}
   </StoreContext.Provider>
   );
   };
4. Wrap the App with the StoreContextProvider component so that any component can acess the context value
5. Add cartItem state and set as empty object as default
6. Create addToCart and removeFromCart function with the itemId as parameter
7. If user first time adding item in the cart, it will create new entry in the cartItem, else add the quantity of the itemId
8. Store cartItem, setCartItem, addTocart and removeFromCart as variable in contextValue object

## 10. FoodDisplay component

### 10a. Setup FoodDisplay component

1. Create FoodDisplay component folder
2. Create FoodDisplay.jsx and Menu.css
3. Import FoodDisplay.css in the FoodDisplay.jsx file
4. Destructure the props in the component paramater

### 10b. Create FoodDisplay component

1. Wrap with a div with class and id of food-display
2. Create a div with 'food-display-list' class and map the food_list array
   -> food_list.map((item, index)=>{})
3. Mount the FoodItem component in the map callback with the food details props
4. FoodItem will structure food_list item

### 10c. Style FoodDisplay component

1. Use grid to organize the list of the food
   -> grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
   -> that means creates as many columns as possible that fit within the container, with each column will be at least 240px wide but can grow to take up more space (1fr) if available
2. Set 30px column gap and 50px row gap
   -> gap: 50px 30px;

## 11. FoodItem component

### 11a. Setup FoodItem component

1. Create FoodItem component folder
2. Create FoodItem.jsx and Menu.css
3. Import FoodItem.css in the FoodDisplay.jsx file
4. Destructure all the props in the component paramater

### 11b. Create FoodItem component

1. Wrap with a div with class and id of food-item
2. Structure all the food details, image, name, price and description of a single item
3. Import the stars rating from the assets
4. create itemCount state
5. In food-item-image class, create a function that will incrase and decrease the itemCount state when the '+' and '-' img is clicked
6. Name the class as add-food-item and food-item-counter
7. destructure contextValue and use the context using useContext(StoreContext)

### 11. Style FoodItem component

1. Style all the elements
2. Make the .food-item-img-container position as relative
3. Make the add-food-item and .food-item-counter relative
   // stop at 1.40.31

# Backend

## Setup backend project

1. Create backend folder and open terminal
2. write command 'npm init' or 'npm init -y' for default
3. entry point as index.js, server.js or app.js
   -> if it will use other backend, use index, if it is a standalone backend use server or app
4. Create file server.js
5. install dependencies -> npm install express mongoose bcrypt cors jsonwebtoken dotenv body-parser multer stripe validator
6. install nodemon as dev dependency -> npm i -D nodemon
7. create .gitignore files with -> /node_modules .env
8. inside package.json, in scripts object insert
   -> "dev": "nodemon server.js" or "server": "nodemon server.js"
9. create folders in backend -> models, routes, middleware, controllers, config, uploads
10. crate .env file
11. in package.json add -> "type": "module",

## Setup app/server.js

1. export express and cors
2. declare app as express - const app = express()
3. setup middlewares
   -> app.use(express.json()) -> app.use(cors())
4. define port number -> const port = process.env.PORT || 4000
5. setup API response -> app.get('/), (req, res)=>{
6. -> const start = async() => {
   app.listen(port, () => console.log(`Server is listening on port ${port}...`))}
   -> wrap in try catch
   res.status(200).send('Hello World)}
7. run the app -> start ();
8. open thunder client and post the localhost url

## Datasbase setup

1. open Atlas MongoDb and connect the drive and copy the connection string
2. paste the connection string in .env as a MONGO_URI variable
3. edit the password and project name
4. create db.js in config folder and create the connectDB function and export default connectDB
5. import {config} from 'dotenv' and invoke config
6. add the connectDB (import connectDB first - must add .js)
   -> await connectDB(process.env.MONGO_URI)

## Create models

1. create FoodModel.js in model folder
2. import mongoose and create schema
   -> const FoodSchema = new mongoose.Schema({})
3. set the schema as a model
   -> const FoodModel = mongoose.model(Food, FoodSchema)
4. export deafult FoodModel

## Setup controller and route

1. create foodController.js in controllers folder
2. import the FoodModel and {StatusCodes}
3. setup CRUD and export eg:
   -> const addFood = (req, res) => {}
   -> export {addfood}
4. create foodRoute.js in routes folder
5. import express, import {addFood} and call Router from express -> const foodRouter = exprees.Router()
6. create route and export eg:
   -> foodRouter.route('/add').post(addFood)
   -> export default foodRouter
7. import and add routes in server.js
   -> app.use('/api/food)
8. the post url will be http://localhost:3000/api/food/add

## Controllers

1. to post to db, can use -> item = await Model.create or -> item = new Model and item.saved()

## Routes

1. use multer to handle file request

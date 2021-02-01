# Drinkly

# About the Application

This is a simple cocktail finder app. Search for ingredients and find cocktail recipes that include those ingredients. Utilizes [TheCocktialDB](https://www.thecocktaildb.com/) to get the lists of ingredients and cocktails.

This repo is a Create React App deployed with Netlify.

## [Live Demo](https://6014a6840f0d0b0008ef3934--happy-jones-ed171e.netlify.app/)

# Getting Started on the Development Server

1. clone the repo
2. `cd drinkly`
3. `npm install`

#### Create a .env file in the root directory with these environment variables
- REACT_APP_BASE_URL="https://www.thecocktaildb.com/api/json/v2"
- REACT_APP_API_KEY (*set equal to `"1"` for development. A purchase is required from TheCocktailDB upon any public release*)

#### Start the server
1. `npm start`

- Runs the app in the development mode.
  Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

  The page will reload if you make edits.\
  You will also see any lint errors in the console.

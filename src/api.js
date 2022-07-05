// const API_KEY = `${process.env.REACT_APP_API_KEY}`;
import axios from "axios";

const API_KEY = "78b0fe73a4a72f8aa99ea669e16dfc67";
const APP_ID = "a65cd11b";
const BASE_URL = "https://api.edamam.com/api/recipes/v2";

export const getCocktail = async () => {
  return await axios
    .get(
      `${BASE_URL}?type=public&q=cocktail&app_id=${APP_ID}&app_key=${API_KEY}&dishType=Drinks&random=true`
    )
    .then((response) => response.data)
    .catch((err) => {
      if (err.response) {
        //if request succeeded, server response
        const { status, config } = err.response;

        if (status === 404) {
          console.log(`${config.url} not found`);
        }
        if (status === 500) {
          console.log("Server error");
        }
      } else if (err.request) {
        // succeeded request but no response
        console.log("Error", err.message);
      } else {
        // other error
        console.log("Error", err.message);
      }
    });
};

export const searchDrink = async (query) => {
  return await axios
    .get(
      `${BASE_URL}?type=public&q=${query}&app_id=${APP_ID}&app_key=${API_KEY}&dishType=Drinks&random=true`
    )
    .then((response) => response.data);
};

export const recipeDetail = async (recipeId) => {
  return await axios
    .get(
      `${BASE_URL}/${recipeId}?type=public&app_id=${APP_ID}&app_key=${API_KEY}`
    )
    .then((response) => response.data)
};

import axios from "axios";

const baseURL = "/api/recipes";

export const addRecipe = (recipe) => axios.post(baseURL, recipe);

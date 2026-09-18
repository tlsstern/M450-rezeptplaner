import axios from "axios";

const baseURL = "/api/recipes";

export const updateRecipe = (id, recipe) => axios.put(`${baseURL}/${id}`, recipe);

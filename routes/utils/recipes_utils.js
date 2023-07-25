const axios = require("axios");
const DButils = require("./DButils");
const api_domain = "https://api.spoonacular.com/recipes";

/**
 * Get recipes list from spooncular response and extract the relevant recipe data for preview
 * @param {*} recipes_info
 */

async function getRecipeInformation(recipe_id) {
  return await axios.get(`${api_domain}/${recipe_id}/information`, {
    params: {
      includeNutrition: false,
      // apiKey: process.env.spooncular_apiKey,
      apiKey: 'e45ade9df77d4855bbeb0c1d0a4ea8f6',
    },
  });
}

async function getRandomRecipes() {
  return await axios.get(`${api_domain}/random`, {
    params: {
      number: 3,
      apiKey: 'e45ade9df77d4855bbeb0c1d0a4ea8f6',
    },
  });
}

async function extractPreviewRecipeDetails(recipes_info) {
  return recipes_info.map((recipe_info) => {
    let data = recipe_info;
    if (recipe_info.data) {
      data = recipe_info.data;
    }
    const {
      id,
      title,
      readyInMinutes,
      image,
      popularity,
      aggregateLikes,
      vegan,
      vegetarian,
      glutenFree,
    } = data;
    return {
      id: id,
      title: title,
      readyInMinutes: readyInMinutes,
      image: image,
      popularity: popularity,
      aggregateLikes: aggregateLikes,
      vegan: vegan,
      vegetarian: vegetarian,
      glutenFree: glutenFree,
    };
  });
}

async function getRecipeDetails(recipe_id) {
  let recipe_info = await getRecipeInformation(recipe_id);
  let {
    id,
    title,
    readyInMinutes,
    image,
    popularity,
    aggregateLikes,
    vegan,
    vegetarian,
    glutenFree,
    extendedIngredients,
    instructions,
    analyzedInstructions,
    servings,
  } = recipe_info.data;

  return {
    id: id,
    title: title,
    readyInMinutes: readyInMinutes,
    image: image,
    popularity:popularity,
    aggregateLikes: aggregateLikes,
    vegan: vegan,
    vegetarian: vegetarian,
    glutenFree: glutenFree,
    extendedIngredients: extendedIngredients,
    instructions: instructions,
    analyzedInstructions: analyzedInstructions,
    servings: servings,
  };
}

async function getFamilyRecipeDetails(id) {
  const recipes = await DButils.execQuery(
    `select * from family_recipes where id='${id}'`
  );
  return recipes;
}

async function getRecipesPreview(recipes_ids_list) {
  let promises = [];
  recipes_ids_list.map((id) => {
    promises.push(getRecipeInformation(id));
  });
  let info_res = await Promise.all(promises);
  return extractPreviewRecipeDetails(info_res);
}

async function getThreeRecipesRandom() {
  let random_pool = await getRandomRecipes();
  return extractPreviewRecipeDetails(random_pool.data.recipes);
}

async function getFamilyRecipes() {
  const recipes = await DButils.execQuery(`select * from family_recipes`);
  return recipes;
}

async function searchForRecipesAPI(search_params) {
  let search_res = await axios.get(`${api_domain}/complexSearch`, {
    params: {
      query: search_params.query,
      number: search_params.number,
      instructionsRequired: search_params.instructionsRequired,
      cuisine: search_params.cuisine,
      diet: search_params.diet,
      intolerances: search_params.intolerances,
      sort: search_params.sort,
      sortDirection: search_params.sortDirection,
      addRecipeInformation: true,
      // apiKey: process.env.spooncular_apiKey,
      apiKey: 'e45ade9df77d4855bbeb0c1d0a4ea8f6',
    },
  });

  return search_res.data;
}
exports.getRecipeDetails = getRecipeDetails;
exports.getFamilyRecipeDetails = getFamilyRecipeDetails;
exports.getRecipesPreview = getRecipesPreview;
exports.getThreeRecipesRandom = getThreeRecipesRandom;
exports.getFamilyRecipes = getFamilyRecipes;
exports.searchForRecipesAPI = searchForRecipesAPI;

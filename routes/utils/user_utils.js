const DButils = require("./DButils");

async function markAsFavorite(user_id, recipe_id) {
  await DButils.execQuery(
    `insert into FavoriteRecipes values ('${user_id}',${recipe_id})`
  );
}

async function getFavoriteRecipes(user_id) {
  const recipes_id = await DButils.execQuery(
    `select recipe_id from FavoriteRecipes where user_id='${user_id}'`
  );
  return recipes_id;
}

async function addToHistory(user_id, recipe_id) {
  await DButils.execQuery(
    `insert into history values ('0', '${user_id}',${recipe_id})`
  );
}

async function getHistory(user_id) {
  const recipes_id = await DButils.execQuery(
    `select recipe_id from history where userid='${user_id}'`
  );
  return recipes_id;
}

async function inFavorites(user_id, recipe_id) {
  const result = await DButils.execQuery(
    `select COUNT(*) from FavoriteRecipes where (user_id='${user_id}' and recipe_id='${recipe_id}')`
  );
  return result;
}

async function inHistory(user_id, recipe_id) {
  const result = await DButils.execQuery(
    `select COUNT(*) from history where (userid='${user_id}' and recipe_id='${recipe_id}')`
  );
  return result;
}

async function addMyRecipe(
  user_id,
  title,
  readyInMinutes,
  image,
  popularity,
  vegan,
  vegetarian,
  glutenFree,
  extendedIngredients,
  instruction,
  servings
) {
  const result = await DButils.execQuery('SELECT MAX(id) AS max_counter FROM my_recipes');
  const counter = result[0].max_counter || 0; // Default to 0 if no rows are returned
  
  const newCounter = counter + 1;

  await DButils.execQuery(
    `INSERT INTO my_recipes (user_id, id, title, readyInMinutes, image, popularity, vegan, vegetarian, glutenFree, extendedIngredients, instructions, servings) VALUES ('${user_id}', '${newCounter}', '${title}', '${readyInMinutes}', '${image}', '${popularity}', '${vegan}', '${vegetarian}', '${glutenFree}', '${extendedIngredients}', '${instruction}', '${servings}')`
  );
}

async function getMyRecipes(user_id) {
  const recipes = await DButils.execQuery(
    `select * from my_recipes where user_id='${user_id}'`
  );
  return recipes;
}

async function getMyRecipeDetails(id) {
  const recipes = await DButils.execQuery(
    `select * from my_recipes where id='${id}'`
  );
  return recipes;
}

async function getFamilyRecipes(user_id) {
  const recipes = await DButils.execQuery(
    `select * from family_recipes where userid='${user_id}'`
  );
  return recipes;
}

async function getFamilyRecipeDetails(id) {
  const recipes = await DButils.execQuery(
    `select * from family_recipes where id='${id}'`
  );
  return recipes;
}

exports.markAsFavorite = markAsFavorite;
exports.getFavoriteRecipes = getFavoriteRecipes;
exports.inFavorites = inFavorites;
exports.inHistory = inHistory;
exports.addMyRecipe = addMyRecipe;
exports.getMyRecipes = getMyRecipes;
exports.getMyRecipeDetails = getMyRecipeDetails;
exports.getHistory = getHistory;
exports.addToHistory = addToHistory;
exports.getFamilyRecipes = getFamilyRecipes;
exports.getFamilyRecipeDetails = getFamilyRecipeDetails;


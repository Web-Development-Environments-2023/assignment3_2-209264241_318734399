var express = require("express");
var router = express.Router();
const DButils = require("./utils/DButils");
const user_utils = require("./utils/user_utils");
const recipe_utils = require("./utils/recipes_utils");

/**
 * Authenticate all incoming requests by middleware
 */
router.use(async function (req, res, next) {
  if (req.session && req.session.username) {
    DButils.execQuery("SELECT username FROM users")
      .then((users) => {
        if (users.find((x) => x.username === req.session.username)) {
          req.username = req.session.username;
          next();
        }
      })
      .catch((err) => next(err));
  } else {
    res.sendStatus(401);
  }
});

router.post("/setUsername", (req, res) => {
  try {
    const { username } = req.body;
    req.session.username = username;
    res.sendStatus(200);
  } catch (err) {
    res.sendStatus(500);
  }
});

/**
 * This path gets body with recipeId and save this recipe in the favorites list of the logged-in user
 */
router.post("/favorites", async (req, res, next) => {
  try {
    const user_id = req.session.username;
    const recipe_id = req.body.recipeId;
    await user_utils.markAsFavorite(user_id, recipe_id);
    res.status(200).send("The Recipe successfully saved as favorite");
  } catch (error) {
    next(error);
  }
});

/**
 * This path returns the favorites recipes that were saved by the logged-in user
 */
router.get("/favorites", async (req, res, next) => {
  try {
    const user_id = req.session.username;
    const recipes_id = await user_utils.getFavoriteRecipes(user_id);
    let recipes_id_array = [];
    recipes_id.map((element) => recipes_id_array.push(element.recipe_id)); //extracting the recipe ids into array
    const results = await recipe_utils.getRecipesPreview(recipes_id_array);
    res.status(200).send(results);
  } catch (error) {
    next(error);
  }
});

/**
 * This path gets body with recipeId and save this recipe in the history
 */
router.post("/history", async (req, res, next) => {
  try {
    const user_id = req.session.username;
    const recipe_id = req.body.recipeId;
    await user_utils.addToHistory(user_id, recipe_id);
    res.status(200).send("The Recipe added successfully to history");
  } catch (error) {
    next(error);
  }
});

/**
 * This path returns the favorites recipes that were saved by history
 */
router.get("/history", async (req, res, next) => {
  try {
    const user_id = req.session.username;
    const recipes_id = await user_utils.getHistory(user_id);
    const recipes_id_array = recipes_id.map((element) => element.recipe_id); // Extracting the recipe IDs into an array
    const results = await recipe_utils.getRecipesPreview(
      recipes_id_array.slice(-3)
    );
    res.status(200).send(results);
  } catch (error) {
    next(error);
  }
});

router.get("/inFavorites", async (req, res, next) => {
  try {
    const user_id = req.session.username;
    const recipe_id = req.query.recipeId;
    const results = await user_utils.inFavorites(user_id, recipe_id);
    res.status(200).send(results);
  } catch (error) {
    next(error);
  }
});

router.get("/inHistory", async (req, res, next) => {
  try {
    const user_id = req.session.username;
    const recipe_id = req.query.recipeId;
    const results = await user_utils.inHistory(user_id, recipe_id);
    res.status(200).send(results);
  } catch (error) {
    next(error);
  }
});

router.post("/addRecipe", async (req, res, next) => {
  try {
    const user_id = req.session.username;
    const title = req.body.title;
    const readyInMinutes = req.body.readyInMinutes;
    const image = req.body.image;
    const popularity = req.body.popularity;
    const vegan = req.body.vegan;
    const vegetarian = req.body.vegetarian;
    const glutenFree = req.body.glutenFree;
    const extendedIngredients = req.body.extendedIngredients;
    const instruction = req.body.instructions;
    const servings = req.body.servings;
    

    await user_utils.addMyRecipe(
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
    );
    res.status(200).send("The Recipe saved successfully");
  } catch (error) {
    next(error);
  }
});

router.get("/addRecipe", async (req, res, next) => {
  try {
    const user_id = req.session.username;
    const results = await user_utils.getMyRecipes(user_id);
    res.status(200).send(results);
  } catch (error) {
    next(error);
  }
});

router.get("/recipes/info", async (req, res, next) => {
  try {
    const recipe = await user_utils.getMyRecipeDetails(req.query.recipeId);
    res.send(recipe);
  } catch (error) {
    next(error);
  }
});

module.exports = router;

var express = require("express");
var router = express.Router();
const recipes_utils = require("./utils/recipes_utils");

router.get("/", (req, res) => res.send("im here"));

/**
 * This path returns 3 random recipes
 */
router.get("/random", async (req, res, next) => {
  try {
    let random_pool = await recipes_utils.getThreeRecipesRandom();
    res.send(random_pool);
  } catch (error) {
    next(error);
  }
});

/**
 * This path returns family recipes
 */
router.get("/family", async (req, res, next) => {
  try {
    let family_pool = await recipes_utils.getFamilyRecipes();
    res.send(family_pool);
  } catch (error) {
    next(error);
  }
});

/**
 * This path returns a full details of a search query that filtered
 */
router.get("/search", async (req, res, next) => {
  // search params
  search_params = {};
  search_params.query = req.query.query;
  search_params.number = req.query.number;
  search_params.instructionsRequired = req.query.intolerances;
  search_params.cuisine = req.query.cuisine;
  search_params.diet = req.query.diet;
  search_params.intolerances = req.query.intolerances;
  search_params.sort = req.query.sort;
  search_params.sortDirection = req.query.sortDirection;

  try {
    let recipes = await recipes_utils.searchForRecipesAPI(search_params);
    res.send(recipes);
  } catch (error) {
    next(error);
  }
});

/**
 * This path returns the full details of a recipe by it's id
 */
router.get("/info", async (req, res, next) => {
  try {
    const recipe = await recipes_utils.getRecipeDetails(req.query.recipeId);
    res.send(recipe);
  } catch (error) {
    next(error);
  }
});

router.get("/family/info", async (req, res, next) => {
  try {
    const recipe = await recipes_utils.getFamilyRecipeDetails(req.query.recipeId);
    res.send(recipe);
  } catch (error) {
    next(error);
  }
});

module.exports = router;

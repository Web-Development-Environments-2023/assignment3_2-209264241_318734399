-- SQLBook: Code

CREATE DATABASE mydb;

USE mydb;

CREATE TABLE
    users (
        username VARCHAR(255),
        firstname VARCHAR(255),
        lastname VARCHAR(255),
        country VARCHAR(255),
        password VARCHAR(255),
        email VARCHAR(255)
    );

CREATE TABLE
    my_recipes (
        user_id VARCHAR(255),
        recipe_id INT(255),
        title VARCHAR(255),
        readyInMinutes INT(255),
        image VARCHAR(255),
        popularity INT(255),
        vegan BOOLEAN,
        vegetarian BOOLEAN,
        glutenFree BOOLEAN,
        extendedIngredients VARCHAR(255),
        instructions VARCHAR(255),
        servings INT(255)
    );

CREATE TABLE
    favoriteRecipes (
        user_id VARCHAR(255),
        recipe_Id VARCHAR(255)
    );

CREATE TABLE
    history (
        num INT(255),
        userid VARCHAR(255),
        recipe_id VARCHAR(255)
    );

CREATE TABLE
    family_recipes (
        recipe_id INT(255),
        creator VARCHAR(255),
        holiday VARCHAR(255),
        ingredients VARCHAR(255),
        instructions VARCHAR(255)
    );
[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-718a45dd9cf7e7f842a935f5ebbe5719a5e09af4491e668f4dbf3b35d5cca122.svg)](https://classroom.github.com/online_ide?assignment_repo_id=11279009&assignment_repo_type=AssignmentRepo)

Ron Faygler - 318734399
Nadav Cherry - 209264241


שינויים בקוד לאחר תאריך ההגשה:

async function getRecipeInformation(recipe_id) {
  return await axios.get(`${api_domain}/${recipe_id}/information`, {
    params: {
      includeNutrition: false,
      // apiKey: process.env.spooncular_apiKey, זה מה שהיה שהעלנו לפני תאריך ההגשה
      apiKey: 'e45ade9df77d4855bbeb0c1d0a4ea8f6', זה מה שעשינו אחרי
    },
  });
}
עשינו את השינוי הזה גם בפונקציות searchForRecipesAPI, getRecipeInformation,getRandomRecipes. בדיוק אותו שינוי משום מה הייתה לנו בעיה עם process.env.spooncular_apiKey הוא לא מצא את המשתנה.

בנוסף שינינו את ה localhost לip של הremote: 
const state = {

    // server_domain: "http://localhost:3000",

    server_domain: "https://ronadav.cs.bgu.ac.il",
    
};

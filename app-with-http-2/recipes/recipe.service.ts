import { ShoppingListService } from "./../shopping-list/shopping-list.service";
import { Injectable } from "@angular/core";
import { Recipe } from "./recipe.model";
import { Ingredient } from "../shared/ingredient.model";
import { Subject } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class RecipeService {
  recipeChanged = new Subject<Recipe[]>();
  private recipes: Recipe[] = [
    new Recipe(
      "A Healthy Salad",
      "Yummi with fresh vegies",
      "https://cdn.pixabay.com/photo/2016/04/21/12/38/tempeh-1343291_1280.jpg",
      [new Ingredient("Tomatoes", 1), new Ingredient("Cucumbers", 20)]
    ),
    new Recipe(
      "Biriyani",
      "Delcious and tasty Rice food",
      "https://upload.wikimedia.org/wikipedia/commons/1/13/Kritunga_special_chicken_biriyani.JPG",
      [new Ingredient("Eggs", 2), new Ingredient("Meat", 2)]
    )
  ];
  constructor(private slService: ShoppingListService) {}
  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipeChanged.next(this.recipes.slice());
  }
  getRecipes() {
    return this.recipes.slice();
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.slService.addIngredients(ingredients);
  }
  getRecipe(index: number) {
    return this.recipes[index];
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipeChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipeChanged.next(this.recipes.slice());
  }
  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipeChanged.next(this.recipes.slice());
  }
}

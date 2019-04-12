import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { RecipeService } from "../recipes/recipe.service";
import { Recipe } from "../recipes/recipe.model";
import { map } from "rxjs/operators";
@Injectable({
  providedIn: "root"
})
export class DataStorageService {
  constructor(private http: HttpClient, private recipeService: RecipeService) {}

  storeRecipes() {
    return this.http.put<Recipe[]>(
      "https://ng-recipe-buks.firebaseio.com/recipes.json",
      this.recipeService.getRecipes()
    );
  }
  getRecipes() {
    return this.http
      .get<Recipe[]>("https://ng-recipe-buks.firebaseio.com/recipes.json")
      .pipe(
        map(response => {
          const recipes: Recipe[] = response;
          for (let recipe of recipes) {
            if (!recipe["ingredients"]) {
              recipe["ingredients"] = [];
            }
          }
          return recipes;
        })
      )
      .subscribe((recipes: Recipe[]) => {
        this.recipeService.setRecipes(recipes);
      });
  }
}

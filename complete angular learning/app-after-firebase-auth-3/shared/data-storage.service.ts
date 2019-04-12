import { AuthService } from './../auth/auth.service';
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { RecipeService } from "../recipes/recipe.service";
import { Recipe } from "../recipes/recipe.model";
import { map } from "rxjs/operators";
@Injectable({
  providedIn: "root"
})
export class DataStorageService {
  constructor(private http: HttpClient, private recipeService: RecipeService, private authService: AuthService) { }

  storeRecipes() {
    const token = this.authService.getToken()
    return this.http.put<Recipe[]>(
      "https://ng-recipe-buks.firebaseio.com/recipes.json?auth=" + token,
      this.recipeService.getRecipes()
    );
  }
  getRecipes() {

    const token = this.authService.getToken()

    this.http
      .get<Recipe[]>("https://ng-recipe-buks.firebaseio.com/recipes.json?auth=" + token)
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

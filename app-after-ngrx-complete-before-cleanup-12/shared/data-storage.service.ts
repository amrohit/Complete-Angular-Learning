import { AuthService } from './../auth/auth.service';
import { HttpClient, HttpHeaders, HttpParams, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { RecipeService } from "../recipes/recipe.service";
import { Recipe } from "../recipes/recipe.model";
import { map } from "rxjs/operators";
@Injectable({
  providedIn: "root"
}) //we could remove authservice injection since we are not using anymore
export class DataStorageService {
  fbUrl: string = "https://ng-recipe-buks.firebaseio.com/recipes.json"
  constructor(private http: HttpClient, private recipeService: RecipeService, private authService: AuthService) { }

  storeRecipes() {

    return this.http.put<Recipe[]>(
      this.fbUrl,
      this.recipeService.getRecipes(), {
        // params: new HttpParams().set('auth', token)
      }
    );
    /*  const req = new HttpRequest('PUT', 'https://ng-recipe-buks.firebaseio.com/recipes.json', this.recipeService.getRecipes(), { reportProgress: true, params: new HttpParams().set('auth', token) })
      return this.http.request(req);
    */
  }
  getRecipes() {

    this.http
      .get<Recipe[]>(this.fbUrl, {
        responseType: 'json', //default, changeable to text,arraybuffer,blob
        //  observe: 'body',
        // params: new HttpParams().set('auth', token)
      })
      .pipe(
        map((recipes) => {
          console.log(recipes)
          for (let recipe of recipes) {
            if (!recipe["ingredients"]) {
              recipe["ingredients"] = [];
            }
          }
          return recipes;
        })
      )
      .subscribe((recipes: Recipe[]) => {
        console.log(recipes);
        this.recipeService.setRecipes(recipes);
      });
  }
}

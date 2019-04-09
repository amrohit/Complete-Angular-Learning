import { Store } from '@ngrx/store';
import { HttpClient } from '@angular/common/http';
import { switchMap, map, withLatestFrom } from 'rxjs/operators';

import { Effect, Actions, ofType } from '@ngrx/effects';
import * as   RecipeActions from './recipe.actions';
import { Recipe } from '../recipe.model';
import { Injectable } from '@angular/core';
import * as fromRecipe from '../store/recipe.reducers'
@Injectable()
export class RecipeEffects {
  fbUrl: string = "https://ng-recipe-buks.firebaseio.com/recipes.json"
  @Effect()
  recipeFetch = this.actions$.pipe(
    ofType(RecipeActions.FETCH_RECIPE),
    switchMap((action: RecipeActions.FetchRecipes) => {
      return this.http
        .get<Recipe[]>(this.fbUrl, {
          responseType: 'json'

        })
    }),
    map((recipes) => {
      console.log(recipes)
      for (let recipe of recipes) {
        if (!recipe["ingredients"]) {
          recipe["ingredients"] = [];
        }
      }
      return {
        type: RecipeActions.SET_RECIPES,
        payload: recipes
      };
    })
  )

  @Effect({ dispatch: false })
  recipeStore = this.actions$.pipe(
    ofType(RecipeActions.STORE_RECIPE),
    withLatestFrom(this.store.select('recipes')),
    switchMap(([action, state]) => {
      return this.http.put<Recipe[]>(
        this.fbUrl,
        state.recipes
      );
    })
  )

  constructor(private actions$: Actions, private http: HttpClient, private store: Store<fromRecipe.FeatureState>) { }
}

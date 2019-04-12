import { Store } from '@ngrx/store';
import * as fromRecipe from '../store/recipe.reducers'
import { Observable } from "rxjs";
import { Component, OnInit, OnDestroy } from "@angular/core";
// import { Recipe } from "../recipe.model";
// import { RecipeService } from "../recipe.service";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-recipe-list",
  templateUrl: "./recipe-list.component.html",
  styleUrls: ["./recipe-list.component.css"]
})
export class RecipeListComponent implements OnInit {
  recipeState$: Observable<fromRecipe.State>;
  // subscription: Subscription;
  constructor(
    // private recipeService: RecipeService,
    private router: Router,
    private routes: ActivatedRoute,
    private store: Store<fromRecipe.FeatureState>
  ) { }

  ngOnInit() {
    /* this.subscription = this.recipeService.recipeChanged.subscribe(
       (recipes: Recipe[]) => {
         this.recipes = recipes;
       }
     );
     this.recipes = this.recipeService.getRecipes();
  */
    //lets do with ngrx
    this.recipeState$ = this.store.select('recipes');
  }
  onNewRecipe() {
    this.router.navigate(["new"], { relativeTo: this.routes });
  }
  // ngOnDestroy() {
  //   this.subscription.unsubscribe();
  // }
}

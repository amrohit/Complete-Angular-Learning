import { ShoppingListService } from "./shopping-list.service";
import { Component, OnInit, OnDestroy } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";
import { Subscription, Observable } from "rxjs";
import { Store } from '@ngrx/store';
import * as fromShoppingList from './store/shopping-list.reducers'
import * as  ShoppingListActions from './store/shopping-list.actions';
@Component({
  selector: "app-shopping-list",
  templateUrl: "./shopping-list.component.html",
  styleUrls: ["./shopping-list.component.css"]
})
export class ShoppingListComponent implements OnInit {
  shoppingListState: Observable<fromShoppingList.State>;
  // private subscription: Subscription;

  constructor(
    private store: Store<fromShoppingList.AppState>) { }

  ngOnInit() {
    // this.ingredients = this.slService.getIngredients();
    this.shoppingListState = this.store.select('shoppingList')
    // this.subscription = this.slService.ingredientsChanged.subscribe(
    //   (ingredients: Ingredient[]) => (this.ingredients = ingredients)
    // );
  }
  onEditItem(index: number) {
    //this.slService.startedEditing.next(index);
    this.store.dispatch(new ShoppingListActions.StartEdit(index))
  }
  // ngOnDestroy() {
  //   this.subscription.unsubscribe();
  // }
}

import { Observable } from 'rxjs';
import { AuthService } from '../../auth/auth.service';
import { DataStorageService } from "../../shared/data-storage.service";
import { Component, EventEmitter, Output, OnInit } from "@angular/core";
import { Recipe } from "../../recipes/recipe.model";
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducers'
import * as fromAuth from '../../auth/store/auth.reducers'

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"]
})
export class HeaderComponent implements OnInit {

  authState: Observable<fromAuth.State>

  constructor(private dataStorageService: DataStorageService, public authService:
    AuthService, private store: Store<fromApp.AppState>) { }

  ngOnInit() {

    this.authState = this.store.select('auth')
    this.authState.subscribe(response => console.log(response))

  }

  // isAuthenticated() {
  //   return this.authService.isAuthenticated();
  // }
  onSave() {
    this.dataStorageService.storeRecipes().subscribe((recipes: Recipe[]) => {
      console.log(recipes);
    });
  }
  onFetch() {
    this.dataStorageService.getRecipes();
  }
  onLogout() {
    this.authService.logout()
  }
}

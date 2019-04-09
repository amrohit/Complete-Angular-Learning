import { AuthService } from './../auth/auth.service';
import { DataStorageService } from "./../shared/data-storage.service";
import { Component, EventEmitter, Output } from "@angular/core";
import { Recipe } from "../recipes/recipe.model";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"]
})
export class HeaderComponent {
  @Output() featureSelected = new EventEmitter<string>();

  constructor(private dataStorageService: DataStorageService, private authService: AuthService) { }
  onSelect(feature: string) {
    this.featureSelected.emit(feature);
  }
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

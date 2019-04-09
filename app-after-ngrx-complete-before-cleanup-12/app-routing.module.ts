import { AuthGuard } from './auth/auth-guard.service';
import { HomeComponent } from './core/home/home.component';
import { NgModule } from "@angular/core";
import { Routes, RouterModule, PreloadAllModules } from "@angular/router";
import { ShoppingListComponent } from "./shopping-list/shopping-list.component";
const routes: Routes = [
  { path: "", component: HomeComponent },
  {
    path: 'recipes',
    loadChildren: './recipes/recipes.module#RecipesModule'
    // ,canLoad: [AuthGuard]
  },
  { path: "shopping-list", component: ShoppingListComponent },
  { path: '***', redirectTo: '/' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules, useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

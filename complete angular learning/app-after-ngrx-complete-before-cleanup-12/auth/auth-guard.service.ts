import { Route } from '@angular/compiler/src/core';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanLoad } from '@angular/router';
import { AuthService } from './auth.service';
import * as fromApp from '../store/app.reducers'
import * as fromAuth from '../auth/store/auth.reducers'
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { map, take } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {
  constructor(private store: Store<fromApp.AppState>) { }
  canLoad(route: Route): Observable<boolean> | Promise<boolean> | boolean {
    return this.store.select('auth').pipe(
      take(1),
      map((authState: fromAuth.State) => {
        console.log(authState.authenticated);
        return authState.authenticated
      })
    )
  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.store.select('auth').pipe(
      take(1),
      map((authState: fromAuth.State) => {
        return authState.authenticated
      }),

    )
  }
}

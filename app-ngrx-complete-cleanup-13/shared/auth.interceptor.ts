import { Store } from '@ngrx/store';
import { AuthService } from './../auth/auth.service';
import { HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import * as fromApp from '../store/app.reducers'
import * as fromAuth from '../auth/store/auth.reducers'
import { map, switchMap, take } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {
  constructor(private store: Store<fromApp.AppState>) {

  }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('Intercepted!', req);

    return this.store.select('auth')
      .pipe(
        take(1),
        switchMap((authState: fromAuth.State) => {
          const copiedReq = req.clone({ params: req.params.set('auth', authState.token) })
          return next.handle(copiedReq)
        }) //only get this value once from subscription
      )

  }
}

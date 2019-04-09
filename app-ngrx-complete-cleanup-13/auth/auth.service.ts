import * as firebase from "firebase";
import { Injectable } from "@angular/core";
import { Router } from '@angular/router';
import * as fromApp from '../store/app.reducers'
import * as AuthActions from './store/auth.actions'
import { Store } from '@ngrx/store';
@Injectable({
  providedIn: "root"
})
export class AuthService {
  // token: string;
  constructor(private router: Router, private store: Store<fromApp.AppState>) { }
  signupUser(email: string, password: string) {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(
        user => {
          this.store.dispatch(new AuthActions.Signup())
          firebase
            .auth()
            .currentUser.getIdToken()
            .then((token: string) => {
              this.store.dispatch(new AuthActions.SetToken(token))
            })
        }
      )
      .catch(error => console.log(error));
  }
  signinUser(email: string, password: string) {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(response => {
        this.store.dispatch(new AuthActions.Signin())
        this.router.navigate(['/'])
        firebase
          .auth()
          .currentUser.getIdToken()
          .then((token: string) => {
            this.store.dispatch(new AuthActions.SetToken(token))
            // this.token = token
          })
      })
      .catch(error => console.log(error));
  }

  // getToken() {
  //   firebase
  //     .auth()
  //     .currentUser.getIdToken()
  //     .then((token: string) => (this.token = token));
  //   return this.token;
  // }

  // isAuthenticated() {
  //   return this.token != null;
  // }

  logout() {
    firebase.auth().signOut()
    // this.token = null;
    this.store.dispatch(new AuthActions.Logout())
  }
}
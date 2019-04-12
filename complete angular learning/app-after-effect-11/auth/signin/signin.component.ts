
import { AuthService } from "./../auth.service";
import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import * as fromApp from '../../store/app.reducers'
import * as AuthActions from './../store/auth.actions';
import { Store } from '@ngrx/store';

@Component({
  selector: "app-signin",
  templateUrl: "./signin.component.html",
  styleUrls: ["./signin.component.css"]
})
export class SigninComponent implements OnInit {
  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit() { }
  onSignin(form: NgForm) {
    const value = form.value;
    // this.authService.signinUser(value.email, value.password);
    this.store.dispatch(new AuthActions.TrySignin({ username: value.email, password: value.password }))
  }
}

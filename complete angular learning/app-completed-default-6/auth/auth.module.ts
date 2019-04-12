import { AuthRoutingModule } from './auth-routing.module';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { SignupComponent } from './signup/signup.component';
import { SigninComponent } from './signin/signin.component';

@NgModule({
  declarations: [
    SignupComponent,
    SigninComponent
  ],
  imports: [FormsModule, AuthRoutingModule],
  exports: [],
})
export class AuthModule { }

import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { User } from '../../models/user';

import { AuthProvider } from '../../providers/auth-service/auth-service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
	public registerAccount: User = new User('','','','');

  constructor(public navCtrl: NavController, public _auth: AuthProvider) {

  }

  loginUser(): void {
    this._auth.loginUser("user@gmail.com","user123")
      .then(() => this.onSignInSuccess());
  }

  signupUser(): void {
    this._auth.signupUser("user2@gmail.com","user123")
      .then(() => this.onSignInSuccess());
  }

  private onSignInSuccess(): void {
    console.log("wwallahhhh");
  }

}

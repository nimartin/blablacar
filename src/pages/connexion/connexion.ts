import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { User } from '../../models/user';
import { TravelList } from '../travel-list/travel-list';
import { Register } from '../register/register';
import { EmailValidator } from '../../validators/email';

import { AuthProvider } from '../../providers/auth-service/auth-service';

/**
 * Generated class for the Connexion page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-connexion',
  templateUrl: 'connexion.html',
})
export class Connexion {

	public registerAccount: User = new User('','','','');

  constructor(public navCtrl: NavController, public _auth: AuthProvider) {

  }

  loginUser(): void {
    this._auth.loginUser(this.registerAccount.email,this.registerAccount.password)
      .then(() => this.onSignInSuccess());
  }

  register(): void {
    this.navCtrl.push(Register);
  }

  private onSignInSuccess(): void {
    this.navCtrl.push(TravelList);
  }

}

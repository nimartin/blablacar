import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { User } from '../../models/user';
import { TravelList } from '../travel-list/travel-list';

import { AuthProvider } from '../../providers/auth-service/auth-service';

/**
 * Generated class for the Register page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class Register {

  public registerAccount: User = new User('','','','');

  public passwordVerify : any;

  constructor(public navCtrl: NavController, public _auth: AuthProvider) {

  }


  registerUser(): void {
  	if(this.registerAccount.password == this.passwordVerify){
  		this._auth.signupUser(this.registerAccount.email,this.registerAccount.password)
      .then(() => this.onSignUpSuccess());
  	}
    
  }

  private onSignUpSuccess(): void {
    this.navCtrl.push(TravelList);
  }

}

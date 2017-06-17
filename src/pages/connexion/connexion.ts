import { Component } from '@angular/core';
import { User } from '../../models/user';
import { TabsPage } from '../tabs/tabs';
import { Register } from '../register/register';
import {
  IonicPage, 
  Loading,
  LoadingController, 
  NavController,
  AlertController } from 'ionic-angular';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
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

   /**
   * use to connect a new User
   */
	public registerAccount: User = new User('','','','');
  /**
   * FormGroup for the connexion of the user
   */
  public loginForm:FormGroup;

  /**
   * Open when the user submit the form
   */
  public loading:Loading;

  /**
   * Instanciate the form and its validators
   */
  constructor(public navCtrl: NavController, public authProvider: AuthProvider,
    public loadingCtrl: LoadingController, public alertCtrl: AlertController , public formBuilder: FormBuilder) {

    this.loginForm = formBuilder.group({
      email: ['', Validators.compose([Validators.required, 
        EmailValidator.isValid])],
      password: ['', Validators.compose([Validators.minLength(6), 
        Validators.required])]
    });

  }
  /**
   * Log the user using a call of authProvider an its method loginUser
   */
  loginUser(): void {
    if (!this.loginForm.valid){
      console.log(this.loginForm.value);
    } else {
      this.authProvider.loginUser(this.loginForm.value.email, 
          this.loginForm.value.password)
      .then( authData => {
        this.loading.dismiss().then( () => {
          this.navCtrl.setRoot(TabsPage);
        });
      }, error => {
        this.loading.dismiss().then( () => {
          let alert = this.alertCtrl.create({
            message: error.message,
            buttons: [
              {
                text: "Ok",
                role: 'cancel'
              }
            ]
          });
          alert.present();
        });
      });
      this.loading = this.loadingCtrl.create();
      this.loading.present();
    }
  }
  /**
   * Go to sign up page
   */
  goToSignUp(): void {
    this.navCtrl.push(Register);
  }

 

}

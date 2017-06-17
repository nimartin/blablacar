import { Component } from '@angular/core';
import { TravelList } from '../travel-list/travel-list';
import { IonicPage, 
  NavController, 
  Loading,
  LoadingController,
  AlertController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmailValidator } from '../../validators/email';
import { AuthProvider } from '../../providers/auth-service/auth-service';
import { UserEditPage } from '../user-edit/user-edit';
import { UserPage } from '../user/user';
import { User } from '../../models/user';

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

  /**
   * use to verify the 2 passwords input
   */
  public passwordVerify : any;

  /**
   * FormGroup for the connexion of the user
   */
  public signupForm: FormGroup;

  /**
   * Open when the user submit the form
   */
  loading: Loading;

   /**
   * Instanciate the form and its validators
   */
  constructor(public navCtrl: NavController, public authProvider: AuthProvider,
    public formBuilder: FormBuilder, public loadingCtrl: LoadingController, 
    public alertCtrl: AlertController) {

      this.signupForm = formBuilder.group({
        email: ['', Validators.compose([Validators.required, EmailValidator.isValid])],
        password: ['', Validators.compose([Validators.minLength(6), Validators.required])],
        passwordVerify: ['', Validators.compose([Validators.minLength(6), Validators.required])]
      });
    }


    /**
     * Sign up the user using a call of authProvider an its method signupUser
     */
    registerUser(){
      if (!this.signupForm.valid){
        console.log(this.signupForm.value);
      } else {
        this.authProvider.signupUser(this.signupForm.value.email, 
            this.signupForm.value.password)
        .then(() => {
          this.loading.dismiss().then( () => {
            this.navCtrl.push(UserEditPage, {
              user: new User('','',this.signupForm.value.email,'') 
            });
          });
        }, (error) => {
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

}

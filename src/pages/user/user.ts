import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth-service/auth-service';
import { User } from '../../models/user';
import { Connexion } from '../connexion/connexion';
import { UserEditPage } from '../user-edit/user-edit';
import {
  Loading,
  LoadingController, 
  AlertController } from 'ionic-angular';

import firebase from 'firebase/app';

/**
 * Generated class for the UserPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-user',
  templateUrl: 'user.html',
})
export class UserPage implements OnInit{

	private user : User;
	private userProfile : any;
	public loading:Loading;
  constructor(public navCtrl: NavController, public navParams: NavParams,public authProvider: AuthProvider,
		 public loadingCtrl: LoadingController, public alertCtrl: AlertController) {
  	// this.user = this.authProvider.currentUserInfo(); 
  	// console.log(this.user);
  	this.user = new User('','','','');

  }

	ngOnInit() {
		this.authProvider.currentUserInfo().on('value', data => {
	      this.user = new User(data.val().name,data.val().lastname,data.val().email,data.val().image);
	      console.log(this.user);
	    });
	}

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserPage');
  };

  logOut(){
		this.authProvider.logoutUser().then( authData => {
        this.loading.dismiss().then( () => {
          this.navCtrl.setRoot(Connexion);
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

	edit(){
		this.navCtrl.push(UserEditPage);
	}


}

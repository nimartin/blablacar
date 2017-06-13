import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth-service/auth-service';
import { User } from '../../models/user';

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
  constructor(public navCtrl: NavController, public navParams: NavParams,public authProvider: AuthProvider) {
  	console.log(authProvider.currentUser);
  	// this.user = this.authProvider.currentUserInfo(); 
  	// console.log(this.user);

  }

	ngOnInit() {
		this.user = this.authProvider.currentUserInfo(); 
  	console.log(this.user);
	}

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserPage');
  }



}

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Travel } from '../../models/travel';
import { TravelAdd } from '../travel-add/travel-add';
import {AngularFireDatabase} from 'angularfire2/database';

import { Connexion } from '../connexion/connexion';
import { AuthProvider } from '../../providers/auth-service/auth-service';

import {
	Loading,
	LoadingController, 
	AlertController } from 'ionic-angular';
/**
 * Generated class for the TravelList page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
 @IonicPage()
 @Component({
 	selector: 'page-travel-list',
 	templateUrl: 'travel-list.html',
 })

 export class TravelList {

 	/**
	 * Firebase Observable List of travels
	 */
	public travels: Array<Travel>; //FirebaseListObservable<any>;

	/**
	* Use on logOut()
	*/
	loading:Loading;

	/**
	* Fetch all the list of travels
	*/
	constructor(public db:AngularFireDatabase, public navCtrl: NavController, public navParams: NavParams, public authProvider: AuthProvider,
		public loadingCtrl: LoadingController, public alertCtrl: AlertController) {
		this.travels = [];

		db.list('/travels')
		.subscribe((list: any)=> {
			this.travels = list;
		});
	}

	/**
	 * Redirect to the travelAdd Page
	 */
	 goToAddTravel(){
	 	this.navCtrl.push(TravelAdd);
	 }

	 /**
	 * Log out the user using the authProvider
	 */
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

	}

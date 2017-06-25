import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Travel } from '../../models/travel';
import { TravelList } from '../travel-list/travel-list';
import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';
import { GoogleMap, GoogleMapsEvent, GoogleMapsLatLng } from 'ionic-native';
import {googlemaps} from 'googlemaps';
import { GoogleService } from '../../providers/google-service/google-service';

//declare var google : any;
/**
 * Generated class for the TravelAdd page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
 @IonicPage()
 @Component({
 	selector: 'page-travel-add',
 	templateUrl: 'travel-add.html',
 })
 export class TravelAdd{
 	/**
	* travels from firebase
	*/
 	travels :FirebaseListObservable<Travel[]>;

 	/**
	* newTravel to add
	*/
 	public newTravel: Travel = new Travel('','','',null,'');


 	/**
	* Instanciate the firebase travels
	*/
 	constructor(public db:AngularFireDatabase, public navCtrl: NavController, public navParams: NavParams,public googleService : GoogleService) {
 		this.travels = db.list('/travels');
 		console.log(googleService);
 	}

	/**
	 * Push a travel to firebase
	 */
	addTravel(){
		this.travels.push({
			startPlace 	: this.googleService.autocomplete.query,
			endPlace	: this.googleService.autocompleteEnd.query,
			hourStart		: this.newTravel.hourStart,
			nbPlace	: this.newTravel.nbPlace,
			duration : this.googleService.duration
		});
		this.navCtrl.push(TravelList);
	}

}

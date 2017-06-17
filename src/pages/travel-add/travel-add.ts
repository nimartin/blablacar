import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Travel } from '../../models/travel';
import { TravelList } from '../travel-list/travel-list';
import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';
import { GoogleMap, GoogleMapsEvent, GoogleMapsLatLng } from 'ionic-native';
import {googlemaps} from 'googlemaps'

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
 export class TravelAdd implements OnInit{
 	/**
	* travels from firebase
	*/
 	travels :FirebaseListObservable<Travel[]>;

 	/**
	* newTravel to add
	*/
 	public newTravel: Travel = new Travel('','','',null,'');

 	/**
	* Items to autocomplete startPlace searchBar
	*/
 	autocompleteItems: any;

 	/**
	* Items to autocomplete endPlace searchBar
	*/
 	autocompleteItemsEnd: any;

 	/**
	* autocomplete for startPlace searchBar
	*/
 	autocomplete: any;

 	/**
	* autocomplete for endPlace searchBar
	*/
 	autocompleteEnd: any;

 	/**
	* goople maps / places AutoCompleteService
	*/
 	acService:any;

 	/**
	* Use to calculate the best routes / durations between to place
	*/
 	directionsService : any;

 	/**
	* Instanciate the firebase travels
	*/
 	constructor(public db:AngularFireDatabase, public navCtrl: NavController, public navParams: NavParams) {
 		this.travels = db.list('/travels');
 	}

	/**
	 * Instanciate all the google maps variables required
	 */
	 ngOnInit() {
	 	this.acService = new google.maps.places.AutocompleteService();        
	 	this.autocompleteItems = [];
	 	this.autocomplete = {
	 		query: ''
	 	}; 
	 	this.autocompleteEnd = {
	 		query: ''
	 	};        
	 	this.directionsService = new google.maps.DirectionsService;
	 }

	/**
	 * Called to get the place predictions when user is typing
	 */
	 updateSearch(autocomplete,type) {
	 	console.log('modal > updateSearch');
	 	if (this.autocomplete.query == '') {
	 		this.autocompleteItems = [];
	 		return;
	 	}
	 	let self = this; 
	 	let config = { 
			//types:  ['geocode'], // other types available in the API: 'establishment', 'regions', and 'cities'
			input: autocomplete.query, 
			componentRestrictions: {  } 
		}
		this.acService.getPlacePredictions(config, function (predictions, status) {
			console.log('modal > getPlacePredictions > status > ', status);
			if(type == 'start'){
				self.autocompleteItems = [];            
				predictions.forEach(function (prediction) {              
					self.autocompleteItems.push(prediction);
				});
			}else{
				self.autocompleteItemsEnd = [];            
				predictions.forEach(function (prediction) {              
					self.autocompleteItemsEnd.push(prediction);
				});
			}
			
		});
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad TravelAdd');
	}

	/**
	 * Call to get the prediction on start place
	 */
	chooseStart(item){
		this.newTravel.startPlace = item.description;
		this.autocomplete.query = item.description;
		this.autocompleteItems = [];
		if(this.newTravel.startPlace != '' && this.newTravel.endPlace != '')
			this.calculTime();
	}

	/**
	 * Call to get the prediction on end place
	 */
	chooseEnd(item){
		this.newTravel.endPlace = item.description;
		this.autocompleteEnd.query = item.description;
		this.autocompleteItemsEnd = [];
		if(this.newTravel.startPlace != '' && this.newTravel.endPlace != '')
			this.calculTime();
	}

	/**
	 * Call to get all the routes from startplace to endplace
	 */
	calculTime(){
		this.directionsService.route({
			origin: this.newTravel.startPlace,
			destination: this.newTravel.endPlace,
			travelMode: 'DRIVING'
		}, (response, status) => {
			if (status === 'OK') {
				this.getDuration(response.routes[0]);
			} else {
				console.log(status);
			}
		});
	}

	/**
	 * @params {any} route
	 * Get the better route and its duration
	 */
	getDuration(route){
		var finalRoute = route.legs[0];
		for(var r in route.legs){
			if (route.legs[r].duration.value <  finalRoute.duration.value){
				finalRoute = route.legs[r];
			}
		}
		this.newTravel.duration = finalRoute.duration.text;
	}

	/**
	 * Push a travel to firebase
	 */
	addTravel(){
		this.travels.push({
			startPlace 	: this.newTravel.startPlace,
			endPlace	: this.newTravel.endPlace,
			hourStart		: this.newTravel.hourStart,
			nbPlace	: this.newTravel.nbPlace,
			duration : this.newTravel.duration
		});
		this.navCtrl.push(TravelList);
	}

}

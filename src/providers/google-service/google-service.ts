import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { User } from '../../models/user';
import firebase from 'firebase/app';
import { GoogleMap, GoogleMapsEvent, GoogleMapsLatLng } from 'ionic-native';
import {googlemaps} from 'googlemaps'

declare var google;
@Injectable()
export class GoogleService {
	/**
	* current duration
	*/
 	public duration: any ;
  /**
	* Items to autocomplete startPlace searchBar
	*/
 	public autocompleteItems: any ;

 	/**
	* Items to autocomplete endPlace searchBar
	*/
 	public autocompleteItemsEnd: any ;

 	/**
	* autocomplete for startPlace searchBar
	*/
 	public autocomplete: any ;

 	/**
	* autocomplete for endPlace searchBar
	*/
 	public autocompleteEnd: any ;

 	/**
	* goople maps / places AutoCompleteService
	*/
 	public acService:any ;

 	/**
	* Use to calculate the best routes / durations between to place
	*/
 	public directionsService : any ;

 	/**
	 * Instanciate all the google maps variables required
	 */
  public constructor() {
  	this.acService = new google.maps.places.AutocompleteService();        
  	console.log(this.acService);
	 	this.autocompleteItems = [];
	 	this.autocomplete = {
	 		query: ''
	 	}; 
	 	this.autocompleteEnd = {
	 		query: ''
	 	};        
	 	this.directionsService = new google.maps.DirectionsService;
	 	this.duration ;
  }

  public ionViewDidLoad(){
  	
  }

 	/**
	 * Called to get the place predictions when user is typing
	 */
	 public updateSearch(autocomplete,type) {
	 	console.log(autocomplete.query);
	 	if (autocomplete.query == '') {
	 		this.autocompleteItems = [];
	 		this.autocompleteItemsEnd = [];
	 		return;
	 	}
	 	let self = this; 
	 	let config = { 
			//types:  ['geocode'], // other types available in the API: 'establishment', 'regions', and 'cities'
			input: autocomplete.query, 
			componentRestrictions: {  } 
		}
		this.acService.getPlacePredictions(config, function (predictions, status) {
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

	/**
	 * Call to get the prediction on start place
	 */
	public chooseStart(item){
		this.autocomplete.query = item.description;
		this.autocompleteItems = [];
		if(this.autocomplete.query != '' && this.autocompleteEnd.query != '')
			this.calculTime();
	}

	/**
	 * Call to get the prediction on end place
	 */
	public chooseEnd(item){
		this.autocompleteEnd.query = item.description;
		this.autocompleteItemsEnd = [];
		if(this.autocomplete.query != '' && this.autocompleteEnd.query != '')
			this.calculTime();
	}

	/**
	 * Call to get all the routes from startplace to endplace
	 */
	public calculTime(){
		this.directionsService.route({
			origin: this.autocompleteEnd.query,
			destination: this.autocomplete.query,
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
	public getDuration(route){
		var finalRoute = route.legs[0];
		for(var r in route.legs){
			if (route.legs[r].duration.value <  finalRoute.duration.value){
				finalRoute = route.legs[r];
			}
		}
		this.duration = finalRoute.duration.text;
	}

}
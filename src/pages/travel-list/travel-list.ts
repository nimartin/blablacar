import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Travel } from '../../models/travel';


import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';
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

	public travels: Array<Travel>; //FirebaseListObservable<any>;

	constructor(public db:AngularFireDatabase, public navCtrl: NavController, public navParams: NavParams) {
		this.travels = [];

		db.list('/travels')
		  .subscribe((list: any)=> {
		  	console.log(list);
		  	this.travels = list;
		  });
	}


	ionViewDidLoad() {
		console.log("toto");

	}

}

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Travel } from '../../models/travel';
import { TravelList } from '../travel-list/travel-list';
import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';

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
export class TravelAdd {
	travels :FirebaseListObservable<Travel[]>;
	public newTravel: Travel = new Travel('','','',null);

  constructor(public db:AngularFireDatabase, public navCtrl: NavController, public navParams: NavParams) {
  	this.travels = db.list('/travels');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TravelAdd');
  }

  addTravel(){
		this.travels.push({
			startPlace 	: this.newTravel.startPlace,
			endPlace	: this.newTravel.endPlace,
			hourStart		: this.newTravel.hourStart,
			nbPlace	: this.newTravel.nbPlace
		});
		this.navCtrl.push(TravelList);
	}

}

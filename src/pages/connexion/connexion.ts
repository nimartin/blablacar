import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { User } from '../../models/user';
import { TravelList } from '../travel-list/travel-list';
import { TravelAdd } from '../travel-add/travel-add';


/**
 * Generated class for the Connexion page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-connexion',
  templateUrl: 'connexion.html',
})
export class Connexion {

	public registerAccount: User = new User('','','','');

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Connexion');
  }

  verifyConnexion() {

  	console.log(this.registerAccount);
  	this.navCtrl.push(TravelAdd);
  }

}

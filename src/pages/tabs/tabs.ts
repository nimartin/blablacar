import { Component } from '@angular/core';

import { Connexion } from '../connexion/connexion';
import { TravelList } from '../travel-list/travel-list';
import { TravelAdd } from '../travel-add/travel-add';
import { UserPage } from '../user/user';
import { NavController, NavParams} from 'ionic-angular';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
	/**
	* Page on click on the car icon
	*/
  tabTravels = TravelList;

  /**
	* Page on click on the user icon
	*/
  tabUser = UserPage;

  /**
	* define active tab 
	*/
  public activeTab: any;

  /**
	* the root page
	*/
  public root : any;
  
	/**
	* Change active tab if "index" is defined on NavParams
	*/
  constructor(public navCtrl: NavController, public params: NavParams) {
  	this.activeTab = params.get("index")?params.get("index"):0;
  }


}

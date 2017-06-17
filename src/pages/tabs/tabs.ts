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
  tabTravels = TravelList;
  tabUser = UserPage;
  public activeTab: any;
  public root : any;
  constructor(public navCtrl: NavController, public params: NavParams) {
  	this.activeTab = params.get("index")?params.get("index"):0;
  }


}

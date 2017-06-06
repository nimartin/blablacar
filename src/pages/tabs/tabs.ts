import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import { Connexion } from '../connexion/connexion';
import { TravelList } from '../travel-list/travel-list';
import { TravelAdd } from '../travel-add/travel-add';
import { TabsService } from '../../providers/tabs-service/tabs-service';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = TravelList;
  tab3Root = TravelAdd;
  connexion = Connexion;

  root: any = {};

  constructor(public tabsService : TabsService) {
  	this.root = tabsService.currentTab;
  }
}

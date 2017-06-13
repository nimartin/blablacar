import { Component } from '@angular/core';

import { Connexion } from '../connexion/connexion';
import { TravelList } from '../travel-list/travel-list';
import { TravelAdd } from '../travel-add/travel-add';
import { UserPage } from '../user/user';
import { TabsService } from '../../providers/tabs-service/tabs-service';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  tabTravels = TravelList;
  tabUser = UserPage;

  root: any = {};

  constructor(public tabsService : TabsService) {
  	this.root = tabsService.currentTab;
  }
}

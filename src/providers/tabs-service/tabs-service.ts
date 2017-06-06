import { Injectable } from '@angular/core';

@Injectable()
export class TabsService {
	
  _currentTab : any = null;
  constructor() {}

  set currentTab(tab: any){
    this._currentTab = tab;
  }

  get currentTab() {
    return this._currentTab;
  }



}
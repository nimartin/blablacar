import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TravelList } from './travel-list';

@NgModule({
  declarations: [
    TravelList,
  ],
  imports: [
    IonicPageModule.forChild(TravelList),
  ],
  exports: [
    TravelList
  ]
})
export class TravelListModule {}

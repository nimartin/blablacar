import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TravelAdd } from './travel-add';

@NgModule({
  declarations: [
    TravelAdd,
  ],
  imports: [
    IonicPageModule.forChild(TravelAdd),
  ],
  exports: [
    TravelAdd
  ]
})
export class TravelAddModule {}

import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TravelAdd } from './travel-add';
import { GoogleService } from '../providers/google-service/google-service';

@NgModule({
  declarations: [
    TravelAdd,
  ],
  imports: [
    IonicPageModule.forChild(TravelAdd),
  ],
  exports: [
    TravelAdd
  ],
  providers: [
    GoogleService
  ]
})
export class TravelAddModule {}

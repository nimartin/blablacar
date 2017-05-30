import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Connexion } from './connexion';

@NgModule({
  declarations: [
    Connexion,
  ],
  imports: [
    IonicPageModule.forChild(Connexion),
  ],
  exports: [
    Connexion
  ]
})
export class ConnexionModule {}

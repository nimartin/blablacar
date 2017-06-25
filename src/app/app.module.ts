import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { TabsPage } from '../pages/tabs/tabs';
import { Connexion } from '../pages/connexion/connexion';
import { TravelList } from '../pages/travel-list/travel-list';
import { TravelAdd } from '../pages/travel-add/travel-add';
import { Register } from '../pages/register/register';
import { UserPage } from '../pages/user/user';


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

// Import the AF2 Module
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuth } from 'angularfire2/auth';
import { AuthProvider } from '../providers/auth-service/auth-service';
import { GoogleService } from '../providers/google-service/google-service';
import { AngularFireDatabaseModule } from 'angularfire2/database';

import { UserEditPage } from '../pages/user-edit/user-edit';


 
// AF2 Settings
export const firebaseConfig = {
  apiKey: "AIzaSyA3789Yf8GQ_cRFFELLSKd9AT-ST9OT-Eo",
  authDomain: "blablacar-321fa.firebaseapp.com",
  databaseURL: "https://blablacar-321fa.firebaseio.com",
  projectId: "blablacar-321fa",
  storageBucket: "blablacar-321fa.appspot.com",
  messagingSenderId: "520515225132"

};

@NgModule({
  declarations: [
    MyApp,
    TabsPage,
    Connexion,
    TravelList,
    TravelAdd,
    UserPage,
    UserEditPage,
    Register,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TabsPage,
    Connexion,
    TravelList,
    TravelAdd,
    UserPage,
    UserEditPage,
    Register,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AngularFireAuth,
    AuthProvider,
    GoogleService,
  ]
})
export class AppModule {}

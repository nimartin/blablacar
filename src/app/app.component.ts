import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AngularFireAuth } from 'angularfire2/auth';
import { Connexion } from '../pages/connexion/connexion';
import { TabsPage } from '../pages/tabs/tabs';
import { TravelList } from '../pages/travel-list/travel-list';
import { TabsService } from '../providers/tabs-service/tabs-service';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any;
  allTabs: TabsPage;
  constructor(public tabsService:TabsService,platform: Platform, afAuth: AngularFireAuth, statusBar: StatusBar, splashScreen: SplashScreen) {

    const authObserver = afAuth.authState.subscribe( user => {

      if (user) {
        this.rootPage = TravelList;
        authObserver.unsubscribe();
      } else {
        this.rootPage = Connexion;
        authObserver.unsubscribe();

      }
    });
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}

  
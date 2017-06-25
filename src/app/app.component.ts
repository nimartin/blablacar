import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AngularFireAuth } from 'angularfire2/auth';
import { Connexion } from '../pages/connexion/connexion';
import { TabsPage } from '../pages/tabs/tabs';

/**
 * The main component 
 */
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  /**
   * rootPage of the app
   */
  rootPage:any;

  /**
   *  Define the rootPage if there is an user connected or no
   */
  constructor(platform: Platform, afAuth: AngularFireAuth, statusBar: StatusBar, splashScreen: SplashScreen) {

    const authObserver = afAuth.authState.subscribe( user => {
      if (user) {
        this.rootPage = TabsPage;
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

  
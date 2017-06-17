import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Camera, CameraOptions, CameraPopoverOptions } from '@ionic-native/camera';
import { AuthProvider } from '../../providers/auth-service/auth-service';
import { User } from '../../models/user';
import { UserPage } from '../user/user';
import { TabsPage } from '../tabs/tabs';

/**
 * Generated class for the UserEditPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
 @IonicPage()
 @Component({
  selector: 'page-user-edit',
  templateUrl: 'user-edit.html',
  providers: [Camera],
})
export class UserEditPage {
  /**
   * current User
   */
  public user : User;

  /**
   * instanciate current userProfile thank's to navParams
   */
  constructor(public navCtrl: NavController, public navParams: NavParams, public camera : Camera,public authProvider: AuthProvider) {
    this.user = navParams.get('user');
  }

  /**
	 * Allow to open the gallery on mobile phone
	 * Using Cordova camera
	 */
  accessGallery(){
    this.camera.getPicture({
      sourceType: this.camera.PictureSourceType.SAVEDPHOTOALBUM,
      destinationType: this.camera.DestinationType.DATA_URL
    }).then((imageData) => {
      this.user.image = 'data:image/jpeg;base64,'+imageData;
      this.updateImage(this.user.image);
    }, (err) => {
      console.log(err);
    });
  }

  /**
	 * Update the name of the current user thank's to authProvider
	 */
  updateName(name){
    this.authProvider.updateName(name);
  }

	/**
	 * Update the current lastName user thank's to authProvider
	 */
  updateLastName(lastName){
    this.authProvider.updateLastName(lastName);
  }

	/**
	 * Update the current lastName user thank's to authProvider
	 */
  updateImage(image){
    this.authProvider.updateImage(image);
  }

  /**
   * Update the current lastName user thank's to authProvider
   */
  goToUserProfile(){
    this.navCtrl.setRoot(TabsPage,{index: 1});
  }

}

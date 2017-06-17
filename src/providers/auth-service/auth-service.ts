import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { User } from '../../models/user';
import firebase from 'firebase/app';

@Injectable()
export class AuthProvider {
  public currentUser: firebase.User;
  private userProfile : User;
  public user_uid : any;

  constructor(public afAuth: AngularFireAuth) {
  	afAuth.authState.subscribe((user) => 
      this.currentUser = user);

  }

  /**
   * @params {string} newEmail
   * @params {string} newPassword
   * User connexion using firebase auth
   */
  loginUser(newEmail: string, newPassword: string): firebase.Promise<any> {
    return this.afAuth.auth.signInWithEmailAndPassword(newEmail, newPassword);
  }

  /**
   * User logout using firebase auth
   */
  logoutUser(): firebase.Promise<any> {
    return this.afAuth.auth.signOut();
  }

  /**
   * @params {string} newEmail
   * @params {string} newPassword
   * User signup using firebase auth
   */
  signupUser(newEmail: string, newPassword: string): firebase.Promise<any> {
    return this.afAuth.auth.createUserWithEmailAndPassword(newEmail, newPassword)
    .then( newUser => {
        firebase.database().ref('/usersProfile').child(newUser.uid)
        .set({ email: newEmail, name :'' , lastName :'', image :''});
    });
  }

  /**
   * Use to know if the current user is authenticated
   */
  get authenticated(): boolean {
    return this.currentUser !== null;
  }

  /**
   * Fetch current user info, from usersProfile on firebase
   */
  currentUserInfo(){
    return firebase.database().ref('/usersProfile').child(this.currentUser.uid);

  }

  /**
   * @params {string} name
   * update the user name on usersProfile from firebase
   */
  updateName(name: string){
    return firebase.database().ref('/usersProfile').child(firebase.auth().currentUser.uid).update({
      name: name,
    });
  }

  /**
   * @params {string} lastName
   * update the user lastName on usersProfile from firebase
   */
  updateLastName(lastName: string){
    return firebase.database().ref('/usersProfile').child(firebase.auth().currentUser.uid).update({
      lastName: lastName,
    });
  }

  /**
   * @params {string} image
   * update the user image on usersProfile from firebase
   */
  updateImage(image: string){
    return firebase.database().ref('/usersProfile').child(firebase.auth().currentUser.uid).update({
      image: image,
    });
  }


}
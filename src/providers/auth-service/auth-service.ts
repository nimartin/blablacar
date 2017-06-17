import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { User } from '../../models/user';
import firebase from 'firebase/app';

@Injectable()
export class AuthProvider {
  /**
   * current firebase user
   */
  public currentUser: firebase.User;

  /**
   * userProfile of current User
   */ 
  private userProfile : User;

  /**
   * set currentUser 
   */ 
  constructor(public afAuth: AngularFireAuth) {
  	afAuth.authState.subscribe((user) => 
      this.currentUser = user);

  }

  /**
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
   * update the user name on usersProfile from firebase
   */
  updateName(name: string){
    return firebase.database().ref('/usersProfile').child(firebase.auth().currentUser.uid).update({
      name: name,
    });
  }

  /**
   * update the user lastName on usersProfile from firebase
   */
  updateLastName(lastName: string){
    return firebase.database().ref('/usersProfile').child(firebase.auth().currentUser.uid).update({
      lastName: lastName,
    });
  }

  /**
   * update the user image on usersProfile from firebase
   */
  updateImage(image: string){
    return firebase.database().ref('/usersProfile').child(firebase.auth().currentUser.uid).update({
      image: image,
    });
  }


}
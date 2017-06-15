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

  loginUser(newEmail: string, newPassword: string): firebase.Promise<any> {
    return this.afAuth.auth.signInWithEmailAndPassword(newEmail, newPassword);
  }

  resetPassword(email: string): firebase.Promise<any> {
    return this.afAuth.auth.sendPasswordResetEmail(email);
  }

  logoutUser(): firebase.Promise<any> {
    return this.afAuth.auth.signOut();
  }

  signupUser(newEmail: string, newPassword: string): firebase.Promise<any> {
    return this.afAuth.auth.createUserWithEmailAndPassword(newEmail, newPassword)
    .then( newUser => {
        firebase.database().ref('/usersProfile').child(newUser.uid)
        .set({ email: newEmail, name :'' , lastName :'', image :''});
    });
  }

  get authenticated(): boolean {
    return this.currentUser !== null;
  }

  currentUserInfo(){
    /*firebase.database().ref('/usersProfile').child(this.currentUser.uid).on('value', data => {
      this.userProfile = new User(data.val().name,data.val().lastname,data.val().email,data.val().image);
      console.log(this.userProfile);
    });*/
    return firebase.database().ref('/usersProfile').child(this.currentUser.uid);

  }



  // displayName(): string {
  //   if (this.currentUser !== null) {
  //     return this.currentUser.email;
  //   } else {
  //     return '';
  //   }
  // }

}
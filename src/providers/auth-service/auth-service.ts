import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import firebase from 'firebase/app';

@Injectable()
export class AuthProvider {
	private currentUser: firebase.User;

  constructor(public afAuth: AngularFireAuth) {
  	afAuth.authState.subscribe((user: firebase.User) => this.currentUser = user);
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
    return this.afAuth.auth.createUserWithEmailAndPassword(newEmail, newPassword);
  }

  get authenticated(): boolean {
    return this.currentUser !== null;
  }

  // displayName(): string {
  //   if (this.currentUser !== null) {
  //     return this.currentUser.email;
  //   } else {
  //     return '';
  //   }
  // }

}
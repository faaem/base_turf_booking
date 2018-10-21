
import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import AuthProvider = firebase.auth.AuthProvider;

@Injectable()
export class AuthService {
	private user: firebase.User;

	constructor(public afAuth: AngularFireAuth) {
		afAuth.authState.subscribe(user => {
			this.user = user;
		});
	}

	signInWithEmail(credentials) {
		console.log('Sign in with email');
		let email = credentials.mobileNumber + '~@baseturf.co.com';
		return this.afAuth.auth.signInWithEmailAndPassword(email,
			 credentials.password);
	}


	get authenticated(): boolean {
	  return this.user !== null;
	}

	getMobileNumber() {
  return this.user && this.user.email;
	}

	signOut(): Promise<void> {
  return this.afAuth.auth.signOut();
	}

	signUp(credentials) {
	return this.afAuth.auth.createUserWithEmailAndPassword(credentials.email, credentials.password);
	}

}

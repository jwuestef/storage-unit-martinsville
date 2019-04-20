import { Injectable } from '@angular/core';

import { auth } from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';



@Injectable({
    providedIn: 'root'
})
export class AuthService {
    isAdmin: boolean = false;

    constructor(private afAuth: AngularFireAuth) {
        this.afAuth.authState.subscribe(res => {
            this.isAdmin = !!res;
        });
    }

    async googleSignin() {
        const provider = new auth.GoogleAuthProvider();
        await this.afAuth.auth.signInWithPopup(provider);
        window.location.reload(true)
    }

    logout() {
        this.afAuth.auth.signOut();
        window.location.reload(true)
    }

}

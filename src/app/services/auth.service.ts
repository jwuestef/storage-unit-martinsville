import { Injectable } from '@angular/core';

import { auth } from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';



@Injectable({
    providedIn: 'root'
})
export class AuthService {
    isAdmin: boolean = false;

    constructor(private afAuth: AngularFireAuth, private afd: AngularFireDatabase) {
        this.afAuth.authState.subscribe(res => {
            this.isAdmin = !!res;
        });
    }

    async googleSignin() {
        const provider = new auth.GoogleAuthProvider();
        await this.afAuth.auth.signInWithPopup(provider);
        // Get whitelist from database
        this.afd.database.ref('/adminWhitelist').once('value').then(adminsAsObject => {
            const userId = this.afAuth.auth.currentUser.uid;
            if (adminsAsObject.val()[userId] !== undefined) {
                window.location.reload(true);
            } else {
                alert('You do not have permission to access the administrator portal.');
                this.logout();
            }
        });
    }

    logout() {
        this.afAuth.auth.signOut().then( () => {
            window.location.reload(true)
        });
    }

}

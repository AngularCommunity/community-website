import { Injectable, NgZone } from '@angular/core';
import { Mission } from '../shared/models';
import { Observable, ReplaySubject } from 'rxjs/Rx';
import { FirebaseListObservable, FirebaseObjectObservable, AngularFireDatabase } from 'angularfire2/database';
import { Router } from '@angular/router';

import "../shared/shareResults";
import { AngularFireAuth } from "angularfire2/auth";

import * as firebase from 'firebase/app';

declare var Zone;

@Injectable()
export class AuthService {
    userData : Observable<any>;
    updatableUser : FirebaseObjectObservable<any>;
    isAdmin : Observable<boolean>;
    isUser: Observable<boolean>;
    uid: Observable<string>;
    
    constructor(public db: AngularFireDatabase, public auth: AngularFireAuth, private zone: NgZone, private router : Router) {
        this.userData = auth.authState.flatMap( authState => {
            // Overcome angularfire's zone smashing
            return zone.run((): Observable<any> => {
                if(authState) {
                    this.updatableUser = db.object('/users/'+authState.uid);
                    return this.updatableUser;
                } else {
                    this.updatableUser = null;
                    return Observable.of(null);
                    
                }
                
            });
            
        }).shareResults();

        // Detect missing user data and forward to quick-profile
        this.userData.subscribe( authState => {
            if(authState != null && !authState.name) {
                this.router.navigate(['/profile-short']);
            }
        });
       
       // isAdmin should be an observable that sends trues of falses as the users gains or loses admin access
       // Need to combine two streams. take the stream of auth data, and use it to generate a stream of values
       // for the /admin/[userid] and then check to see if the user is an admin
        this.isAdmin =  this.auth.authState.switchMap( authState => {
            // Overcome angularfire's zone smashing
            return zone.run((): Observable<boolean> => {
                if(!authState) {
                    return Observable.of(false);
                } else {
                    return this.db.object('/admin/'+authState.uid)
                    .catch((a, b) => {
                        // This permission error means we aren't an admin
                        return Observable.of(false)
                    });
                }
            });
        }).map( adminObject => 
             (adminObject && adminObject['$value'] === true)
        ).shareResults();
        
        this.isUser =  this.auth.authState.map( authState => !!authState).shareResults();
        
        this.uid = this.auth.authState.switchMap( authState => {
            if(!authState) {
                return Observable.of(null);
            } else {
                return Observable.of(authState.uid);
            }
        }).shareResults();

        
        
        
    }
    loginGoogle() {
        this.auth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
    }

    logout() {
        this.auth.auth.signOut();
    }
    
    /**
     * Take a firebase user (with $key) and use angularfire to update
     */
    updateUser(user) {
        let key = user.$key;
        let value = user.$value;
        let exists = user.$exists
        delete user.$key;
        delete user.$value;
        delete user.$exists;
        this.updatableUser.update(user);
        user.$key = key;
        user.$exists = exists;
    }
}
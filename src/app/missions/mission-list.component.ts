import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FirebaseService } from '../shared/firebase.service';
import { AuthService } from '../shared/auth.service';
import { Mission } from '../shared/models';
import { FirebaseListObservable, AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

@Component({

    templateUrl: './mission-list.component.html',
    styleUrls: ['./mission-list.component.scss', '../developers/expert-form.component.scss']
})
export class MissionListComponent implements OnInit {
    list: FirebaseListObservable<Mission[]>;
    newMission: Mission;
    constructor(public db: AngularFireDatabase, public auth: AuthService, public route: ActivatedRoute, public router: Router) {
    }
    ngOnInit() {
        this.list = this.db.list('/missions/');
        this.newMission = new Mission();
    }
    createMission() {
        let result = this.list.push(this.newMission);
        this.newMission = new Mission();


        // Take the user to their mission
        this.router.navigate(['/missions', result.key, "edit"]);
    }

    edit(mission) {
        this.router.navigate(["/missions", mission.$key, 'edit'])
    }

}

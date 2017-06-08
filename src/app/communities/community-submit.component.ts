import { Component } from '@angular/core';
import { Community } from '../shared/models';
import { Router } from '@angular/router';
import { AngularFireDatabase } from 'angularfire2/database';

@Component({

    selector: 'community-submit',
    templateUrl: './community-submit.component.html',
    styleUrls: ['../developers/expert-form.component.scss']
})
export class CommunitySubmitComponent {
    community: Community;
    id: string;


    constructor(public db: AngularFireDatabase, public router: Router) {
        this.community = new Community();
    }

    processUpdate(item: Community) {
        delete item.$key;
        this.db.list('/queues/communities/')
            .push(item);
        this.router.navigate(['/communities']);
    }
}

import { Component, OnInit } from '@angular/core';

import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { RefirebasePipe } from '../shared/refirebase.pipe';

@Component({

    selector: 'resource-queue',
    templateUrl: './resource-queue.component.html',
    styleUrls: ['../developers/expert-form.component.scss']
})
export class ResourceQueueComponent implements OnInit {
    submissions: FirebaseListObservable<any[]>;
    constructor(private db: AngularFireDatabase) {
        this.submissions = this.db.list('/queues/resources');


    }

    ngOnInit() { }

    accept(submission) {
        let master = this.db.list('/resources/' + submission.category + "/" + submission.subcategory + "/resources/");
        let key = submission.$key;
        delete submission.category;
        delete submission.subcategory;
        delete submission.$key;
        master.push(submission);
        this.submissions.remove(key);

    }
    reject(submission) {
        let key = submission.$key;

        this.submissions.remove(key);
    }

}

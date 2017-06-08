import { Component, Pipe, PipeTransform } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { RefirebasePipe } from '../shared/refirebase.pipe';
import { Resource } from '../shared/models';
import { ResourceFormComponent } from './resource-form.component'
import { AngularFireDatabase } from 'angularfire2/database';

@Component({

    selector: 'resource-new',
    templateUrl: './resource-submit.component.html',
    styleUrls: ['../developers/expert-form.component.scss']
})
export class ResourceSubmitComponent {
    resource: Resource = new Resource();

    constructor(private db: AngularFireDatabase) { }

    save(item: Resource) {
        console.log("new resource submission", item);
        if (item.validate()) {
            delete item.$key;
            this.db.list('/queues/resources')
                .push(item);
            this.resource = new Resource();
        } else {
            console.warn('Invalid submission');
        }
    }
}

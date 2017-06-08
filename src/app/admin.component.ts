import { Component } from '@angular/core';
import { AuthService } from './shared/auth.service';
import { Observable } from 'rxjs/Observable';


import { FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';

import { PickerComponent } from './shared/picker.component';
import { AngularFireDatabase } from 'angularfire2/database';

@Component({
    selector: 'login',
    templateUrl: './admin.component.html',
    styleUrls: ['./developers/expert-form.component.scss']
})
export class AdminComponent {
    available: Observable<any>;
    admins: FirebaseObjectObservable<any>;
    newData;

    constructor(public auth: AuthService, public db: AngularFireDatabase) {
        this.admins = db.object('/admin/');
    }

    update(adminList) {
        if (adminList) {
            delete adminList.$key;
            console.log("saving on admin page", adminList);
            this.admins.set(adminList);
        }
    }

}

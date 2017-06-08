import { Component } from '@angular/core';
import { Expert } from '../shared/models';
import { ExpertFormComponent } from './expert-form.component';
import { Observable } from 'rxjs/Observable'; // load the full rxjs
import { ActivatedRoute, Router } from '@angular/router';
import { FirebaseService, FirebaseTypedService } from '../shared/firebase.service';
import { AngularFireDatabase } from 'angularfire2/database';

@Component({

    selector: 'expert-edit',
    templateUrl: './expert-edit.component.html',
    styleUrls: ['./expert-edit.component.scss']
})
export class ExpertEditComponent {
    expert: Observable<Expert>;
    id: string;
    expertService: FirebaseTypedService<Expert>;

    constructor(private route: ActivatedRoute, private router: Router, private fs: FirebaseService, private db: AngularFireDatabase) {
        this.expertService = fs.attach<Expert>('/users/');
        this.expert = <Observable<Expert>>route.params.switchMap(params => {
            return this.expertService.get(params['id']);
        });
    }

    processUpdate(expertUpdate: Expert) {
        this.expertService.save(expertUpdate);
        let expertStatus = this.db.object("/experts/" + expertUpdate.$key);
        try {
            if (expertUpdate.isExpert) {
                console.log("set expert status to true");
                expertStatus.set(true);
            } else {
                console.log("delete expert status");
                expertStatus.remove();
            }
        } catch (ex) {
            console.error(ex);
        }

        this.router.navigate(['/developers']);
    }
    delete(expert: Expert) {
        this.expertService.delete(expert);
        this.router.navigate(['/developers']);
    }
}

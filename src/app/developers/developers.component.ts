import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { RefirebasePipe } from '../shared/refirebase.pipe';

import { Expert } from '../shared/models';
import { AuthService } from '../shared/auth.service';

import { FireJoinPipe } from '../shared/fire-join.pipe';
import { AngularFireDatabase } from 'angularfire2/database';

@Component({

    selector: 'developers-list',
    templateUrl: './developers.component.html',
    styleUrls: ['./experts.component.scss']
})
export class DevelopersComponent {
    experts;
    auth;

    constructor(public router: Router, public authService: AuthService, public db: AngularFireDatabase) {
        this.experts = db.list('/users/');
        this.auth = authService;
    }

    edit(expert) {
        this.router.navigate(['/developers', expert.$key, 'edit']);
    }
}

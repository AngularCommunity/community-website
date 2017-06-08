import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../shared/auth.service';

@Component({

    selector: "user",
    templateUrl: './user-profile.component.html',
})
export class UserProfileComponent {
    auth;
    userData: Observable<any>;
    showId: boolean;

    constructor(public authService : AuthService, public router : Router ) {
        this.auth = authService.auth;
        this.userData = authService.userData;
    }

    login() {
        this.authService.loginGoogle();
    }
    updateUser(user) {
        this.authService.updateUser(user);
        this.router.navigate(['/']);
    }
}

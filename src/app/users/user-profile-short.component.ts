import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../shared/auth.service';

@Component({

    selector: "user",
    templateUrl: './user-profile-short.component.html',
    styleUrls: ['./user-profile-short.component.scss', '../developers/expert-form.component.scss']
})
export class UserProfileShortComponent {
    user: {name: string};
    showId: boolean;
    
    constructor(private auth: AuthService, private router: Router) {
        auth.userData.subscribe(userObject => {
            console.log('Rendering', userObject);
            this.user = userObject;
        });

    }

    next(user) {
        event.preventDefault();
        this.auth.updateUser(user);
        this.router.navigate(['/profile']);
    }
}

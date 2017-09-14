import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { UserProfile } from '../_models/userprofile';

import { AlertService, AuthenticationService } from '../_services/index';

@Component({
    moduleId: module.id.toString(),
    templateUrl: 'login.component.html'
})

export class LoginComponent implements OnInit {
    model: any = {};
    loading = false;
    returnUrl: string;
    userProfile: UserProfile;
    
    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private alertService: AlertService) { }

    ngOnInit() {
        // reset login status
        this.authenticationService.logout();

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    login() {
        this.loading = true;
        console.log("going to login user " + this.model.username + " and url is " + this.returnUrl); 
        this.authenticationService.loginUser(this.model.username, this.model.password)
         .subscribe(
                data => {
                    this.router.navigate(["/commodity"]);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }
}

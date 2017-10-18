import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { UserProfile } from '../_models/userprofile';
import { Commodity } from '../_models/index';

import { AlertService, AuthenticationService, CommodityService } from '../_services/index';

@Component({
    moduleId: module.id.toString(),
    templateUrl: 'login.component.html'
})

export class LoginComponent implements OnInit {
    model: any = {};
    loading = false;
    loggedIn: boolean = true;
    returnUrl: string;
    userProfile: UserProfile;
    commodities: Commodity[];

     // pagination
     filteredItems : Commodity[];
     pages : number = 4;
     pageSize : number = 5;
     pageNumber : number = 0;
     currentIndex : number = 1;
     items: Commodity[];
     pagesIndex : Array<number>;
     pageStart : number = 1;
     inputName : string = '';
    
    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private commodityService: CommodityService,
        private alertService: AlertService) 
        {
            this.loggedIn = !this.loggedIn;
            console.log('loggedIn', this.loggedIn);
            if(!this.loggedIn) {
                this.getAllCommodities();
            }
        }

    ngOnInit() {
        // reset login status
        this.authenticationService.logout();

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    showLoginPage() {
        this.loggedIn = true;
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

    getAllCommodities() {
        this.loading = true;
        this.commodityService.getAll()
            .subscribe( commodities => { this.commodities = commodities; });
    }
}

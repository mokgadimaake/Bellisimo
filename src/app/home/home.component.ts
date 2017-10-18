import { Component, OnInit } from '@angular/core';

import { User } from '../_models/index';
import {UserProfile } from '../_models/userprofile'
import { UserService } from '../_services/index';

@Component({
    moduleId: module.id.toString(),
    templateUrl: 'home.component.html'
})

export class HomeComponent implements OnInit {
    currentUser: User;
    users: User[] = [];
    userProfiles: UserProfile[];
    

    constructor(private userService: UserService) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }

    ngOnInit() {
        this.loadAllUsers();
        this.loadAllUserProfiles();
    }

    deleteUser(id: number) {
        this.userService.delete(id).subscribe(() => { this.loadAllUsers() });
    }

    private loadAllUsers() {
        this.userService.getAll().subscribe(users => { this.users = users; });
    }

    private loadAllUserProfiles() {
        this.userService.getAllUserProfiles().subscribe(userProfiles => { this.userProfiles = userProfiles;})
    }
}
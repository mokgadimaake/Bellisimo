import { Injectable } from '@angular/core';
import { Http, Headers, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

@Injectable()
export class AuthenticationService {
    constructor(private http: Http) { }

    loginUser(username: string, password: string) {

        console.log("2. inside authentication service: going to login user " + username + " ..."); 

        var params = new URLSearchParams();
        params.set('username', username);
        params.set('password', password);

        let myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');

        let requestOptions = new RequestOptions();
        requestOptions.params = params;
        requestOptions.headers = myHeaders;
    
        let springBootServices = 'http://localhost:9999/user/login';
        return this.http.get(springBootServices, requestOptions)
        .map((response: Response) => {
            // login successful if there's a response
            
            let user = response.json();

            console.log('res.json():', response.json());
            if (user && user.loggedIn) {
                console.log(username,' has successfully loggedin');
                sessionStorage.setItem('currentUser', JSON.stringify(user));
                sessionStorage.setItem('userLoggedIn', 'true');
                // store user details and jwt token in local storage to keep user logged in between page refreshes
            }
        });

    }

    logout() {
        // remove user from local storage to log user out
        sessionStorage.removeItem('currentUser');
        sessionStorage.removeItem('userLoggedIn');
    }
}
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import { Commodity } from '../_models/index';

@Injectable()
export class CommodityService {

    URL: string = 'http://localhost:9999';

    constructor(private http: Http) { }

    getAll() {
        console.log("going to get all items ...");
        return this.http.get('http://localhost:9999/commodities').map((response: Response) => response.json());
    }

    view(commodity: Commodity) {
        return this.http.get('http://localhost:9999/commodity/' + commodity.id).map((response: Response) => response.json());
    }

    create(commodity: Commodity) {

        console.log("stored department", localStorage.getItem("department"));
        console.log("stored type", localStorage.getItem("type"));
        
        //commodity.department = 'Food';
        console.log('commodity.name:', commodity.name);
        console.log('commodity.price:', commodity.price);
        console.log('commodity.department:', commodity.department);
        console.log('commodity.type:', commodity.type);
        console.log('commodity.file:', commodity.file);

        let myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');

        let requestOptions = new RequestOptions();
        requestOptions.headers = myHeaders;

        return this.http.post('http://localhost:9999/commodity/create', JSON.stringify(commodity), requestOptions)
            ;
    }


    update(commodity: Commodity) {

        commodity.department = 'Food';
        console.log('commodity.name:', commodity.name);
        console.log('commodity.price:', commodity.price);
        console.log('commodity.department:', commodity.department);

        let myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');

        let requestOptions = new RequestOptions();
        requestOptions.headers = myHeaders;

        return this.http.post('http://localhost:9999/commodity/update', JSON.stringify(commodity), requestOptions)
            ;
    }

    delete(commodity: Commodity) {

        let myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');

        let requestOptions = new RequestOptions();
        requestOptions.headers = myHeaders;

        return this.http.post('http://localhost:9999/commodity/delete', JSON.stringify(commodity), requestOptions)
            ;
    }
}
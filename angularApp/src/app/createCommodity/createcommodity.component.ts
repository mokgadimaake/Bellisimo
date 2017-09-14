import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { Commodity } from '../_models/index';
import { AlertService, CommodityService } from '../_services/index';

@Component({
    moduleId: module.id.toString(),
    templateUrl: 'createcommodity.component.html'
})

export class CreateCommodityComponent {
    model: any = {};
    loading = false;
    fileToUpload: File;

    constructor(
        private router: Router,
        private commodityService: CommodityService,
        private alertService: AlertService) { }

    createItem() {
        this.loading = true;
        console.log('testing ...');
        this.commodityService.create(this.model)
            .subscribe(
                data => {
                    this.alertService.success('Item created successful', true);
                    this.router.navigate(['/createCommodity']);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }

}

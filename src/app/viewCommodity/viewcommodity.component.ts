import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

import { Commodity } from '../_models/index';
import { AlertService, CommodityService } from '../_services/index';

@Component({
    moduleId: module.id.toString(),
    templateUrl: 'viewcommodity.component.html'
})

export class ViewCommodityComponent {
    model: any = {};
    loading = false;
    selectedCommodity: Commodity;
    
    constructor(
        private router: Router,
        private commodityService: CommodityService,
        private alertService: AlertService) {

        this.selectedCommodity = JSON.parse(localStorage.getItem('selectedCommodity'));
        console.log('selectedCommodity.name:', this.selectedCommodity.name);

         }

    viewItem() {
        this.loading = true;
        console.log('testing ...');
        this.commodityService.create(this.model)
            .subscribe(
                data => {
                    this.alertService.success('Item created successful', true);
                    this.router.navigate(['/commodity']);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }

}

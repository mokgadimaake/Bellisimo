import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { Commodity } from '../_models/index';
import { AlertService, CommodityService } from '../_services/index';

@Component({
    moduleId: module.id.toString(),
    templateUrl: 'editcommodity.component.html'
})

export class EditCommodityComponent {
    model: any = {};
    loading = false;
    selectedCommodity: Commodity;

    constructor(
        private router: Router,
        private commodityService: CommodityService,
        private alertService: AlertService) { 
            this.selectedCommodity = JSON.parse(localStorage.getItem('selectedCommodity'));
            console.log('edit:selectedCommodity.name:', this.selectedCommodity.name);
        }

    editItem() {
        this.loading = true;
        console.log('selectedCommodity.price:', this.selectedCommodity.price);
        this.commodityService.update(this.selectedCommodity)
            .subscribe(
                data => {
                    this.alertService.success('Item updated successful', true);
                    this.router.navigate(['/commodity']);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }

}

import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { Commodity } from '../_models/index';
import { AlertService, CommodityService } from '../_services/index';

import { FileUploader } from 'ng2-file-upload';


@Component({
    moduleId: module.id.toString(),
    templateUrl: 'createcommodity.component.html'
})

export class CreateCommodityComponent {
    model: any = {};
    loading = false;
    fileToUpload: File;

    public uploader:FileUploader = new FileUploader({url:'http://localhost:8080/upload'});

    constructor(
        private router: Router,
        private commodityService: CommodityService,
        private alertService: AlertService) { }

    onDepartmentChange(newValue:any) {
        
        console.log("department", newValue);
        this.model.department = newValue;
        localStorage.removeItem("department");
        localStorage.setItem("department", JSON.stringify(newValue));
    }    

    onTypeChange(newValue:any) {
      console.log("type", newValue);
      this.model.type = newValue;
      localStorage.removeItem("type");
      localStorage.setItem("type", JSON.stringify(newValue));
    }

    createItem() {
        this.loading = true;
        console.log('uploader', this.uploader);
        console.log('testing ...');
        console.log('file', this.model.file)
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

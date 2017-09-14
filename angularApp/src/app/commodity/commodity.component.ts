import { Component, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

import { ViewCommodityComponent } from './../viewCommodity/index';
import { EditCommodityComponent } from './../editCommodity/index';

import { Commodity } from '../_models/index';
import { AlertService, CommodityService } from '../_services/index';

@Component({
    moduleId: module.id.toString(),
    templateUrl: 'commodity.component.html',
    styles: ['.pagination { margin: 0px !important; }']
})

export class CommodityComponent {
    model: any = {};
    loading = false;
    sampleData : string ="some commodity component data";
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

    constructor(private router: Router, private commodityService: CommodityService, 
        private alertService: AlertService) {
       this.getAllCommodities();

       // pagination
       this.filteredItems = this.commodities;
       this.init();
    }

    getAllCommodities() {
        this.loading = true;
        this.commodityService.getAll()
            .subscribe( commodities => { this.commodities = commodities; });
    }

    viewItem(event: any) {
      console.log('value:', event.id);
      localStorage.removeItem("selectedCommodity");
      localStorage.setItem("selectedCommodity", JSON.stringify(event));
      this.router.navigate(["/viewCommodity"]);
    }

    editItem(event: any) {
        console.log('value:', event.id);
        localStorage.removeItem("selectedCommodity");
        localStorage.setItem("selectedCommodity", JSON.stringify(event));
        this.router.navigate(["/editCommodity"]);   
      }

    deleteItem(event: any) {
        console.log('value:', event.id);   
        this.commodityService.delete(event);
        this.commodityService.getAll().subscribe(
            commodities => { this.commodities = commodities; });
      }

    // pagination
    init() {
        this.currentIndex = 1;
        this.pageStart = 1;
        this.pages = 4;

        console.log("we are here 1 ...");
        if(this.filteredItems && this.filteredItems.length) {
            this.pageNumber = parseInt(""+ (this.filteredItems.length / this.pageSize));
            if(this.filteredItems.length % this.pageSize != 0){
               this.pageNumber ++;
            }
        }
        console.log("we are here 2 ...");
        if(this.pageNumber  < this.pages){
              this.pages =  this.pageNumber;
        }
      
        this.refreshItems();
        console.log("this.pageNumber :  "+this.pageNumber);
     }

     FilterByName(){
        this.filteredItems = [];
        if(this.inputName != ""){
              this.commodities.forEach(element => {
                  if(element.name.toUpperCase().indexOf(this.inputName.toUpperCase())>=0){
                    this.filteredItems.push(element);
                 }
              });
        }else{
           this.filteredItems = this.commodities;
        }
        console.log(this.filteredItems);
        this.init();
     }
     fillArray(): any{
        var obj = new Array();
        for(var index = this.pageStart; index< this.pageStart + this.pages; index ++) {
                    obj.push(index);
        }
        return obj;
     }
     refreshItems(){
              if(this.filteredItems && this.filteredItems.slice)   {
                 this.items = this.filteredItems.slice((this.currentIndex - 1)*this.pageSize, (this.currentIndex) * this.pageSize);
                 this.pagesIndex =  this.fillArray();
              }
     }
     prevPage(){
        if(this.currentIndex>1){
           this.currentIndex --;
        } 
        if(this.currentIndex < this.pageStart){
           this.pageStart = this.currentIndex;
        }
        this.refreshItems();
     }
     nextPage(){
        if(this.currentIndex < this.pageNumber){
              this.currentIndex ++;
        }
        if(this.currentIndex >= (this.pageStart + this.pages)){
           this.pageStart = this.currentIndex - this.pages + 1;
        }
   
        this.refreshItems();
     }
      setPage(index : number){
           this.currentIndex = index;
           this.refreshItems();
      }
  

}


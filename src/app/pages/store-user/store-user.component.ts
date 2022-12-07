import { LabelType, Options } from '@angular-slider/ngx-slider';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import {
  BrandControllerService,
  CategoryControllerService,
  ProductControllerService,
} from 'src/app/api-svc';
import { RouterItem } from 'src/app/interface/RouterItem';
import { RouterService } from 'src/app/service/router.service';

@Component({
  selector: 'app-store-user',
  templateUrl: './store-user.component.html',
  styleUrls: ['./store-user.component.scss'],
})
export class StoreUserComponent implements OnInit {
  minValue: number = 0;
  maxValue: number = 100000000;

  // previousRoutes: RouterItem[] = [];

  options: Options = {
    floor: 0,
    ceil: 100000000,
    step: 1000000,
    translate: (value: number, label: LabelType): string => {
      return value.toLocaleString('en') + ' VND';
    },
  };

  constructor(
    private categoryController: CategoryControllerService,
    private brandController: BrandControllerService,
    private productController: ProductControllerService,
    private sanitizer: DomSanitizer,
    // private routerService: RouterService
  ) {
    // this.previousRoutes.push(this.routerService.getPreviousRoute());
    // console.log(this.previousRoutes);
  }

  ngOnInit(): void {
    this.getCategoryData();
    this.getBrandData();
    this.getProductData();
  }

  listCategories: any;
  listBrands: any;
  listProducts: any;

  getCategoryData() {
    this.categoryController
      .getAllCategory(10, 0, 'name')
      .subscribe((response) => {
        this.listCategories = response.result?.content;
      });
  }

  getBrandData() {
    this.brandController
      .getAllBrand(10, 0, 'brandName')
      .subscribe((response) => {
        this.listBrands = response.result?.content;
      });
  }

  // currentlyChecked: CheckBoxType;

  // selectCheckBox(targetType: CheckBoxType) {
  //   // If the checkbox was already checked, clear the currentlyChecked variable
  //   if(this.currentlyChecked === targetType) {
  //     this.currentlyChecked = CheckBoxType.NONE;
  //     return;
  //   }

  //   this.currentlyChecked = targetType;
  //   console.log(this.currentlyChecked)
  // }

  pageSize: number = 10;
  pageIndex: number = 0;

  getProductData() {
    this.productController
      .getAllProduct(this.pageSize, this.pageIndex, 'name')
      .subscribe((response) => {
        response.result?.content?.forEach((item) => {
          if (item.featureImageByte) {
            let objectURL = 'data:image/jpeg;base64,' + item.featureImageByte;

            item.imgUrl = this.sanitizer.bypassSecurityTrustUrl(objectURL);
          }
        });

        this.listProducts = response.result?.content;
      });
  }
}

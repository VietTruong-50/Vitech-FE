import { LabelType, Options } from '@angular-slider/ngx-slider';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import {
  SubCategoryControllerService,
  CategoryControllerService,
  ProductControllerService,
  Product,
  CustomerControllerService,
} from 'src/app/api-svc';
import { RouterItem } from 'src/app/interface/RouterItem';
import { CartService } from 'src/app/service/cart.service';

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

  categorySearch: string[] = [];
  subCategorySearch: string[] = [];
  searchText: any;

  constructor(
    private categoryController: CategoryControllerService,
    private subCategoryController: SubCategoryControllerService,
    private sanitizer: DomSanitizer,
    private cartService: CartService,
    private customerController: CustomerControllerService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        if (this.route.snapshot.paramMap.get('categorySearch') != 'All') {
          this.categorySearch = [];
          this.categorySearch.push(
            this.route.snapshot.paramMap.get('categorySearch')!
          );
        }else{
          this.categorySearch = ['LAPTOP', 'MOBILE', 'ACCESSORIES']
        }
        this.searchText = this.route.snapshot.paramMap.get('searchText');

        this.filterProduct();
        this.getSubCategoryData();
      }
    });
  }

  ngOnInit(): void {
    this.getCategoryData();
  }

  listCategories: any;
  listSubCategories: any;
  listProducts: any;

  getCategoryData() {
    this.categoryController
      .getAllCategory(10, 0, 'name')
      .subscribe((response) => {
        this.listCategories = response.result?.content;
      });
  }

  getSubCategoryData() {
    this.subCategoryController
      .getSubCategoryDataByCategory(this.categorySearch)
      .subscribe((response) => {
        this.listSubCategories = response.result;
      });
  }

  currentPage: number = 1;
  itemsPerPage: number = 20;
  totalElements: number = 100;

  addItemToCart(product: Product) {
    this.cartService.addOrUpdateCartItem(product);
  }

  filterProduct(event?: any) {
    this.customerController
      .filterProduct(
        0,
        1000,
        event != undefined ? event.target.value : 'actualPrice',
        this.categorySearch,
        this.subCategorySearch,
        this.minValue ? this.minValue : 0,
        this.maxValue ? this.maxValue : 100000000,
        this.searchText ? this.searchText : ''
      )
      .subscribe((response) => {
        response.result?.content?.forEach((item) => {
          if (item.featureImageByte) {
            let objectURL = 'data:image/jpeg;base64,' + item.featureImageByte;

            item.imgUrl = this.sanitizer.bypassSecurityTrustUrl(objectURL);
          }
        });

        this.listProducts = response.result?.content;

        this.totalElements = this.listProducts.length;
        this.itemsPerPage = this.totalElements < 20 ? this.totalElements : 20;
      });
  }

  setitemsPerPage(event: any) {
    this.itemsPerPage =
      this.totalElements < event.target.value
        ? this.totalElements
        : event.target.value;
  }

  getCategorySearchList(event: any, category: any) {
    if (event.target.checked) {
      this.categorySearch.push(category.name);
    } else {
      this.categorySearch.splice(this.categorySearch.indexOf(category.name), 1);
    }
    this.getSubCategoryData();
  }

  getSubCategorySearchList(event: any, subCategory: any) {
    if (event.target.checked) {
      this.subCategorySearch.push(subCategory.subCateName);
    } else {
      this.subCategorySearch.splice(
        this.subCategorySearch.indexOf(subCategory.subCateName),
        1
      );
    }
  }
}

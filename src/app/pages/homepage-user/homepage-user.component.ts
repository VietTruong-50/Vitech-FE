import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import {
  CategoryControllerService,
  CustomerControllerService,
  Product,
  ProductControllerService,
  UserControllerService,
} from 'src/app/api-svc';
import { CartService } from 'src/app/service/cart.service';

@Component({
  selector: 'app-homepage-user',
  templateUrl: './homepage-user.component.html',
  styleUrls: ['./homepage-user.component.scss'],
})
export class HomepageUserComponent implements OnInit {
  slideConfig = {
    slidesToShow: 3,
    slidesToScroll: 1,
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 1500,
    touchMove: false,
  };

  constructor(
    private productController: ProductControllerService,
    private sanitizer: DomSanitizer,
    private categoryController: CategoryControllerService,
    private customerController: CustomerControllerService,
    private cartService: CartService,
    private router: Router,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.getData();
    this.getCategoryData();
    this.getProductsByCategory('Laptop');
  }

  productData: any;
  listCategory: any;

  getData() {
    this.productController
      .getAllProduct(30, 0, 'createdAt')
      .subscribe((response) => {
        response.result?.content?.forEach((item) => {
          if (item.featureImageByte) {
            let objectURL = 'data:image/jpeg;base64,' + item.featureImageByte;

            item.imgUrl = this.sanitizer.bypassSecurityTrustUrl(objectURL);
          }
        });

        this.productData = response.result?.content;
      });
  }

  productsByCategory: any;

  getProductsByCategory(name: string) {
    this.productController
      .findProductsByCategoryName(name, 6, 0, 'createdAt')
      .subscribe((response) => {
        response.result?.content!.forEach((item) => {
          if (item.featureImageByte) {
            let objectURL = 'data:image/jpeg;base64,' + item.featureImageByte;

            item.imgUrl = this.sanitizer.bypassSecurityTrustUrl(objectURL);
          }
        });

        this.productsByCategory = response.result?.content;
        console.log(this.productsByCategory);
      });
  }

  getCategoryData() {
    this.categoryController
      .getAllCategory(10, 0, 'id')
      .subscribe((response) => {
        console.log(response.result?.content);

        this.listCategory = response.result?.content;
      });
  }

  addItemToCart(product: Product) {
    this.cartService.addOrUpdateCartItem(product);
  }

  renderTo(url: string, id?: number) {
    this.router.navigate([url, id]);
  }

  viewAll(categorySearch: string) {
    this.router.navigate([
      '/store',
      { categorySearch: categorySearch, searchText: '' },
    ]);
  }
}

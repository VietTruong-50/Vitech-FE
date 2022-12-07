import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import {
  CategoryControllerService,
  Product,
  ProductControllerService,
  UserControllerService,
} from 'src/app/api-svc';

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
    private userController: UserControllerService
  ) {}

  ngOnInit(): void {
    this.getData();
    this.getCategoryData();
    this.getProductsByCategory('Laptops');
  }

  productData: any;
  listCategory: any;

  getData() {
    this.productController
      .getAllProduct(5, 0, 'createdAt')
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

  addItemToCart(itemId: number) {
    this.userController
      .addItemToCart({
        productId: itemId,
        quantity: 1,
        shopping_session_id: 1,
      })
      .subscribe((response) => {
        console.log('Add to cart successfully');
      });
  }

  removeItemFromCart(itemId: number) {
    this.userController
      .removeItemFromCart(1, itemId)
      .subscribe((reponse) => {});
  }
}

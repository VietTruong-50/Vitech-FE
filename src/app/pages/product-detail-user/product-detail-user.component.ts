import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import {
  CustomerControllerService,
  Product,
  ProductControllerService,
} from 'src/app/api-svc';
import { Location } from '@angular/common';
import { PageEvent } from '@angular/material/paginator';
import { CartService } from 'src/app/service/cart.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-product-detail-user',
  templateUrl: './product-detail-user.component.html',
  styleUrls: ['./product-detail-user.component.scss'],
})
export class ProductDetailUserComponent implements OnInit {
  nameProduct: string = 'Laptop 1';
  productData: any;
  id!: string;
  mainImgSrc!: SafeUrl | string;

  // slides = [
  //   { '../../../assets/image/product01.png' },
  //   { '../../../assets/image/product02.png' },
  //   { '../../../assets/image/product03.png' },
  //   { '../../../assets/image/product01.png' },
  //   { '../../../assets/image/product02.png' },
  // ];

  currentPage: number = 1;

  slides: SafeUrl[] = [];

  slideConfig = {
    slidesToShow: 3,
    slidesToScroll: 1,
    vertical: true,
    infinite: true,
    verticalSwiping: true,
    arrows: false,
    adaptiveHeight: true,
  };

  constructor(
    private route: ActivatedRoute,
    private productController: ProductControllerService,
    private sanitizer: DomSanitizer,
    private customerController: CustomerControllerService,
    private cartService: CartService,
    private cookieService: CookieService,
    private router: Router
  ) {
    if (this.route.snapshot.paramMap.get('id') != null) {
      this.id = this.route.snapshot.paramMap.get('id')!;
      this.getProductById();
      this.getComments();
    }
  }

  ngOnInit(): void {}

  setMainImg(imgSrc: any) {
    this.mainImgSrc = imgSrc;
  }

  getProductById() {
    this.productController
      .findProductById(Number(this.id))
      .subscribe((response) => {
        if (response.errorCode == null) {
          console.log(response.result);

          if (response.result?.featureImageByte) {
            let objectURL =
              'data:image/jpeg;base64,' + response.result.featureImageByte;

            this.mainImgSrc = this.sanitizer.bypassSecurityTrustUrl(objectURL);
          }

          response.result?.productImages?.forEach((img) => {
            let objectURL = 'data:image/jpeg;base64,' + img.imageByte;

            let itemSrc = this.sanitizer.bypassSecurityTrustUrl(objectURL);

            this.slides.push(itemSrc);
          });

          this.productData = response.result;
        }
      });
  }

  commentsData: any;

  getComments(pageIndex?: number) {
    this.customerController
      .getCommentPagination(Number(this.id), 0, 20, 'dateCreate', 'ASC')
      .subscribe((rs) => {
        this.commentsData = rs.result?.content;

        console.log(this.commentsData);
      });
  }

  commentContent!: string;

  createComment() {
    console.log(this.commentContent);

    this.customerController
      .createComment({
        content: this.commentContent,
        productId: Number(this.id),
      })
      .subscribe((rs) => {
        this.getComments();
      });
  }

  Navigate(elem: HTMLElement) {
    elem.scrollIntoView({ behavior: 'smooth' });
  }

  isLogin(){
    if(this.cookieService.check('authToken') != null){
      return true;
    }
    return false;
  }

  addItemToCart(product: Product) {
    this.cartService.addOrUpdateCartItem(product);
  }

  searchText: string = '';

  search(categorySearch: string) {
    this.router.navigate([
      '/store',
      { categorySearch: categorySearch, searchText: this.searchText },
    ]);
  }

}

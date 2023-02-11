import { Component, OnInit, SecurityContext } from '@angular/core';
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

  qty: number = 1;

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

  slideConfig2 = {
    slidesToShow: 3,
    slidesToScroll: 1,
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 1500,
    touchMove: false,
  };

  contentToHtml: any;

  constructor(
    private route: ActivatedRoute,
    private productController: ProductControllerService,
    private sanitizer: DomSanitizer,
    private customerController: CustomerControllerService,
    private cartService: CartService,
    private cookieService: CookieService,
    private router: Router
  ) {
    this.route.paramMap.subscribe((res) => {
      if (res.get('id') != null) {
        this.id = res.get('id')!;
        this.getProductById();
        this.getComments();
      }
    });
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
          this.contentToHtml = this.sanitizer.bypassSecurityTrustHtml(
            response.result?.content!
          );

          this.getTop8ProductData(response.result?.subCategory?.subCateName!);
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

  isLogin() {
    if (this.cookieService.check('authToken') != null) {
      return true;
    }
    return false;
  }

  addItemToCart(product: Product) {
    this.cartService.addOrUpdateCartItem(product, this.qty);
  }

  searchText: string = '';

  search(categorySearch: string) {
    this.router.navigate([
      '/store',
      { categorySearch: categorySearch, searchText: this.searchText },
    ]);
  }

  top8Product: any;
  getTop8ProductData(subCatename: string) {
    this.productController
      .findTop8BySubCategoryName(subCatename)
      .subscribe((rs) => {
        rs.result?.forEach((item) => {
          if (item.featureImageByte) {
            let objectURL = 'data:image/jpeg;base64,' + item.featureImageByte;

            item.imgUrl = this.sanitizer.bypassSecurityTrustUrl(objectURL);
          }
        });

        this.top8Product = rs.result;
      });
  }

  renderTo(url: string, id?: number) {
    this.router.navigate([url, id]);
  }
}

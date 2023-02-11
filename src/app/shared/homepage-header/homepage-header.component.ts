import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import {
  CategoryControllerService,
  CustomerControllerService,
} from 'src/app/api-svc';
import { CartService } from 'src/app/service/cart.service';

@Component({
  selector: 'app-homepage-header',
  templateUrl: './homepage-header.component.html',
  styleUrls: ['./homepage-header.component.scss'],
})
export class HomepageHeaderComponent implements OnInit {
  isShowCart: boolean = false;

  currentRoute: string;
  cartId: number = 0;

  constructor(
    private router: Router,
    private customerController: CustomerControllerService,
    private sanitizer: DomSanitizer,
    private categoryController: CategoryControllerService,
    private cartService: CartService,
    private cookieService: CookieService
  ) {
    this.currentRoute = this.router.url;
  }

  ngOnInit(): void {
    this.getCategoriesData();

    if (this.cookieService.check('authToken')) {
      this.getCustomerCart();
      this.getAllNotificationsData();
    } else {
      this.getCartData();
    }
  }

  showCart() {
    this.isShowCart = !this.isShowCart;
  }

  isShowNotification: boolean = false;

  showNotification() {
    this.isShowNotification = !this.isShowNotification;
  }

  renderTo(url: string) {
    if (url != 'signin' && url != 'store' && url != 'homepage' && !this.isLogin()) {
      this.router.navigate(['signin']);
    } else {
      this.router.navigate([url]);
    }
  }

  cartData: any;

  getCartData(cartItems?: any) {
    return this.cartService.getCartData(cartItems);
  }

  totalValues: number = 0;

  get getTotalValues() {
    return this.cartService.getTotalValues();
  }

  get cartLength() {
    return this.getCartData() ? this.getCartData().length : 0;
  }

  getCustomerCart() {
    this.customerController.getShoppingCart().subscribe((rs) => {
      this.getCartData(rs.result?.cartItems);

      rs.result?.cartItems!.forEach((item) => {
        if (item.product?.featureImageByte) {
          let objectURL =
            'data:image/jpeg;base64,' + item.product.featureImageByte;

          item.product.imgUrl =
            this.sanitizer.bypassSecurityTrustUrl(objectURL);
        }
      });
    });
  }

  categoryData: any;

  getCategoriesData() {
    this.categoryController
      .getAllCategory(10, 0, 'name')
      .subscribe((response) => {
        this.categoryData = response.result?.content;
      });
  }

  removeItem(itemId: number) {
    this.cartService.removeItemFromCart(itemId);
  }

  isLogin() {
    if (this.cookieService.check('authToken')) {
      return true;
    }
    return false;
  }

  renderToAccount() {
    this.router.navigate(['account']);
  }

  categorySearch: string = 'All';
  searchText: string = '';

  search() {
    this.router.navigate([
      '/store',
      { categorySearch: this.categorySearch, searchText: this.searchText },
    ]);
  }

  notificationsData: any;

  getAllNotificationsData() {
    this.customerController.getAllNotifications().subscribe((rs) => {
      this.notificationsData = rs.result;
    });
  }

  logOut() {
    this.cookieService.delete('authToken');
    this.cartService.resetCart();
    this.router.navigateByUrl('/homepage').then(() => {
      window.location.reload();
    });;
  }

  checkOrderStatus() {}
}

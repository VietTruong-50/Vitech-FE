import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import {
  CategoryControllerService,
  CustomerControllerService,
  UserControllerService,
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
    // this.getCartData();
    this.getCategoriesData();
    this.getCustomerCart();
  }

  showCart() {
    this.isShowCart = !this.isShowCart;
  }

  renderTo(url: string) {
    this.router.navigate([url]);
  }

  cartData: any;

  getCartData(cartItems?: any) {
    this.cartData = this.cartService.getCartData(cartItems);
  }

  totalValues: number = 0;

  get getTotalValues() {
    return this.cartService.getTotalValues();
  }

  get cartLength() {
    this.getCartData();
    return this.cartData ? this.cartData.length : 0;
  }

  getCustomerCart() {
    if (this.cookieService.check('authToken')) {
      this.customerController.getShoppingCart().subscribe((rs) => {
        this.getCartData(rs.result?.cartItems);
      });
    }
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
}

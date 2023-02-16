import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { CartItem, CustomerControllerService } from 'src/app/api-svc';
import { CartService } from 'src/app/service/cart.service';

@Component({
  selector: 'app-view-cart',
  templateUrl: './view-cart.component.html',
  styleUrls: ['./view-cart.component.scss'],
})
export class ViewCartComponent implements OnInit {
  constructor(
    private cartService: CartService,
    private cookieService: CookieService,
    private customerController: CustomerControllerService
  ) {}

  ngOnInit(): void {
    this.getCustomerCart();
  }

  cartData: CartItem[] = [];
  total: number = 0;

  getCartData(cartItems?: any) {
    this.cartData = this.cartService.getCartData();
  }

  removeItem(itemId?: number) {
    this.cartService.removeItemFromCart(itemId);
    this.getCartData();
  }

  get getTotalValues() {
    return this.cartService.getTotalValues();
  }

  get cartLength() {
    return this.cartData.length;
  }

  quantity: number = 1;

  updateItemQuantity(item: CartItem) {
    this.cartService.addOrUpdateCartItem(item.product!);
  }

  getCustomerCart() {
    if (this.checkLogin()) {
      this.customerController.getShoppingCart().subscribe((rs) => {
        this.getCartData();
      });
    }
  }

  checkLogin() {
    if (this.cookieService.check('authToken')) {
      return true;
    }
    return false;
  }
}

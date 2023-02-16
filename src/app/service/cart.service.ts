import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { CartItem, CustomerControllerService, Product } from '../api-svc';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  _cartItems: CartItem[] = [];

  set cartItems(list: any) {
    this._cartItems = list;
  }

  get cartItems() {
    return this._cartItems;
  }

  constructor(
    private sanitizer: DomSanitizer,
    private customerController: CustomerControllerService,
    private cookieService: CookieService,
    private toastrService: ToastrService
  ) {}

  addOrUpdateCartItem(product: Product, quantity?: number) {
    let qty = 0;
    if (localStorage.getItem('cart_items')) {
      console.log(this._cartItems);

      let index = this._cartItems.findIndex(
        (item) => item.product?.id === product.id
      );

      let valueExist = this._cartItems.find(
        (item) => item.product?.id === product.id
      );

      if (index > -1) {
        this._cartItems.splice(index, 1);
        qty =
          quantity! > 1
            ? valueExist?.quantity! + quantity!
            : valueExist?.quantity! + 1;

        valueExist = {
          id: valueExist?.id,
          quantity: qty,
          product: valueExist?.product,
          itemPrice: valueExist?.itemPrice,
        };

        this._cartItems.push(valueExist);
      } else {
        this._cartItems.push({
          quantity: quantity! > 1 ? quantity : 1,
          product: product,
          itemPrice: product.actualPrice,
        });
      }
    }

    if (this.cookieService.check('authToken')) {
      this.customerController
        .addItemToCart({
          productId: product.id,
          quantity: quantity! > 1 ? quantity : 1,
        })
        .subscribe((rs) => {
          if (rs.errorCode != null) {
            this.toastrService.error('Thêm không thành công!');
          }
        });
    }

    this.saveCart();
    this.toastrService.success('Thêm thành công!', 'Đã thêm 1 sản phẩm');
  }

  saveCart(): void {
    localStorage.setItem('cart_items', JSON.stringify(this._cartItems));
  }

  loadCart(): void {
    this._cartItems = JSON.parse(localStorage.getItem('cart_items')!) ?? [];
  }

  removeItemFromCart(itemId?: number) {
    let index = this._cartItems.findIndex((item) => item.id === itemId);
    let item = this._cartItems.find((item) => item.id === itemId);

    this._cartItems.splice(index, 1);

    if (this.cookieService.check('authToken')) {
      this.customerController
        .removeItemFromCart(item?.product?.id!)
        .subscribe((rs) => {});
    }

    this.saveCart();
  }

  getCartData(cartItems?: any) {
    if (cartItems != null) {
      this._cartItems = cartItems;
      this.saveCart();
    }

    this._cartItems?.forEach((item) => {
      if (item.product!.featureImageByte) {
        let objectURL =
          'data:image/jpeg;base64,' + item.product!.featureImageByte;

        item.product!.imgUrl = this.sanitizer.bypassSecurityTrustUrl(objectURL);
      }
    });

    return this._cartItems;
  }

  getTotalValues() {
    let totalValues = 0;
    this._cartItems.forEach((item) => {
      totalValues += item.itemPrice! * item.quantity!;
    });
    return totalValues;
  }

  resetCart() {
    // this._cartItems = []
    // this.saveCart()
  }
}

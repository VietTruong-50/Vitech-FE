import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { map, Observable, Subject } from 'rxjs';
import {
  CartItem,
  CustomerControllerService,
  Product,
  ShoppingSession,
} from '../api-svc';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartUpdates = new Subject();
  public cartUpdates$ = this.cartUpdates.asObservable();
  cartData: CartItem[] = [];

  constructor(
    private customerController: CustomerControllerService,
    private sanitizer: DomSanitizer
  ) {}

  addItemToCart(product: Product, quantity?: number) {
    if (localStorage.getItem('cart_items')) {
      console.log(this.cartData);

      let index = this.cartData.findIndex(
        (item) => item.product?.actualPrice === product.actualPrice
      );

      let valueExist = this.cartData.find(
        (item) => item.product?.actualPrice === product.actualPrice
      );

      console.log(valueExist);

      if (index > -1) {
        console.log('Product exist');
        this.cartData.splice(index, 1);

        valueExist = {
          id: valueExist?.id,
          quantity: valueExist?.quantity! + (quantity ? quantity : 1),
          product: valueExist?.product,
          itemPrice: valueExist?.itemPrice,
        };

        this.cartData.push(valueExist);
      } else {
        this.cartData.push({
          quantity: quantity ? quantity : 1,
          product: product,
          itemPrice: product.actualPrice,
        });
      }
    }

    this.saveCart();
  }

  saveCart(): void {
    localStorage.setItem('cart_items', JSON.stringify(this.cartData));
  }

  loadCart(): void {
    this.cartData = JSON.parse(localStorage.getItem('cart_items')!) ?? [];
  }

  removeItemFromCart(itemId?: number) {
    let index = this.cartData.findIndex((item) => item.id === itemId);

    this.cartData.splice(index, 1);

    this.saveCart()
  }

  getCartData() {
    this.cartData.forEach((item) => {
      if (item.product!.featureImageByte) {
        let objectURL =
          'data:image/jpeg;base64,' + item.product!.featureImageByte;

        item.product!.imgUrl = this.sanitizer.bypassSecurityTrustUrl(objectURL);
      }
    });
    return this.cartData;
  }

  // getTotalValues(): Observable<number | undefined> {
  //   return this.customerController
  //     .getTotalValues(Number(sessionStorage.getItem('cartId')))
  //     .pipe(map((item) => item.result));
  // }

  getTotalValues(){
    let totalValues = 0;
    this.cartData.forEach(item => {
      totalValues += item.itemPrice!
    })
    return totalValues;
  }
}

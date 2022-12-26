import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import {
  CartItem,
  CategoryControllerService,
  CustomerControllerService,
  UserControllerService,
} from 'src/app/api-svc';
import { CartService } from 'src/app/service/cart.service';

@Component({
  selector: 'app-view-cart',
  templateUrl: './view-cart.component.html',
  styleUrls: ['./view-cart.component.scss'],
})
export class ViewCartComponent implements OnInit {
  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.getCartData();
  }

  cartData: CartItem[] = [];
  total: number = 0;

  getCartData() {
    this.cartData = this.cartService.getCartData();
  }

  removeItem(itemId?: number) {
    this.cartService.removeItemFromCart(itemId);
    this.getCartData()
  }

  get getTotalValues() {
    // this.getCartData()
    return this.cartService.getTotalValues();
  }

  get cartLength() {
    // this.getCartData()
    return this.cartData.length;
  }

  quantity: number = 1;

  updateItemQuantity(item: CartItem, quantity?: number){
    this.cartService.addOrUpdateCartItem(item.product!, quantity)
  }
}

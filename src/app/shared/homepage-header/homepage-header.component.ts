import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import {
  CategoryControllerService,
  CustomerControllerService,
  UserControllerService,
} from 'src/app/api-svc';
import { CartService } from 'src/app/service/cart.service';
import { UserAccountComponent } from '../user-account/user-account.component';

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
    private cartService: CartService
  ) {
    this.currentRoute = this.router.url;
  }

  ngOnInit(): void {
    this.getCartData();
    this.getCategoriesData();
  }

  showCart() {
    this.isShowCart = !this.isShowCart;
  }

  renderTo(url: string) {
    this.router.navigate([url]);
  }

  cartData: any;

  getCartData() {
    this.cartData = this.cartService.getCartData();
    
  }

  totalValues: number = 0;

  get getTotalValues() {
    return this.cartService.getTotalValues()
  }

  get cartLength(){
    return this.cartData.length;
  }

  categoryData: any;

  getCategoriesData() {
    this.categoryController
      .getAllCategory(10, 0, 'name')
      .subscribe((response) => {
        this.categoryData = response.result?.content;
      });
  }

  removeItem(itemId: number){
    this.cartService.removeItemFromCart(itemId)
  }
}

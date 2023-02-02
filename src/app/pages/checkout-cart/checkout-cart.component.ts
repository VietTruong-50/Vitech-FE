import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { AuthControllerService, CartItem, CustomerControllerService } from 'src/app/api-svc';
import { CartService } from 'src/app/service/cart.service';

@Component({
  selector: 'app-checkout-cart',
  templateUrl: './checkout-cart.component.html',
  styleUrls: ['./checkout-cart.component.scss'],
})
export class CheckoutCartComponent implements OnInit {
  shippingFee: number = 20000;
  formGroup: FormGroup

  constructor(
    private customerController: CustomerControllerService,
    private cookieService: CookieService,
    private cartService: CartService,
    private authController: AuthControllerService,
    private formBuilder: FormBuilder
  ) {
    this.formGroup = this.formBuilder.group({
      fullName: [],
      address: [],
      email: [],
      phone: []
    })
  }

  ngOnInit(): void {
    this.getCustomerCart();
    this.getCustomerData()
  }

  getCartData(cartItems?: any) {
    this.cartData = this.cartService.getCartData();
  }

  get getTotalValues() {
    return this.cartService.getTotalValues();
  }

  cartData: any;
  customerData: any

  getCustomerCart() {
    if (this.cookieService.check('authToken')) {
      this.customerController.getShoppingCart().subscribe((rs) => {
        this.getCartData();
      });
    }
  }

  setShippingFee(fee: number) {
    this.shippingFee = fee;
  }

  checkout() {
    this.customerController.checkout({}).subscribe((rs) => {});
  }

  getCustomerData(){
    this.authController.getCurrentUser().subscribe(rs => {
      this.customerData = rs.result
      this.formGroup.patchValue({
        fullName: this.customerData.result.fullName,
        address: this.customerData.result.address,
        email: this.customerData.result.email,
        phone: this.customerData.result.phone
      })
    })
  }
}

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import {
  AuthControllerService,
  CartItem,
  CustomerControllerService,
} from 'src/app/api-svc';
import { CartService } from 'src/app/service/cart.service';
import { CreateAddressDialogComponent } from '../account-page/address-note-page/create-address-dialog/create-address-dialog.component';

@Component({
  selector: 'app-checkout-cart',
  templateUrl: './checkout-cart.component.html',
  styleUrls: ['./checkout-cart.component.scss'],
})
export class CheckoutCartComponent implements OnInit {
  shippingFee: number = 20000;
  formGroup: FormGroup;
  defaultAddress: any;
  cardNumber: string = '';
  shippingId: number = 2;
  constructor(
    private customerController: CustomerControllerService,
    private cookieService: CookieService,
    private cartService: CartService,
    private router: Router,
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private toastrService: ToastrService
  ) {
    this.formGroup = this.formBuilder.group({
      fullName: [],
      email: [],
      phone: [],
      cardNumber: [],
      cardOwner: [],
      month: [],
      year: [],
    });
  }

  ngOnInit(): void {
    this.getCustomerCart();
    this.getAddressData();
    this.getDefaultAddress();
  }

  getCartData(cartItems?: any) {
    this.cartData = this.cartService.getCartData();
  }

  get getTotalValues() {
    return this.cartService.getTotalValues();
  }

  cartData: any;

  getCustomerCart() {
    if (this.cookieService.check('authToken')) {
      this.customerController.getShoppingCart().subscribe((rs) => {
        this.getCartData();
      });
    }
  }

  setShippingFee(fee: number, shippingId: number) {
    this.shippingFee = fee;
    this.shippingId = shippingId;
  }

  checkout() {
    console.log(this.formGroup.getRawValue());

    this.customerController
      .checkout({
        addressId: this.selectedIndex,
        cardNumber: this.formGroup.controls['cardNumber'].value,
        cardOwner: this.formGroup.controls['cardOwner'].value,
        month: this.formGroup.controls['month'].value,
        year: this.formGroup.controls['year'].value,
        paymentMethodEnum:
          this.payingMethod == 'ONLINE_PAYING'
            ? 'ONLINE_PAYING'
            : 'DELIVERY_PAYING',
        shippingMethodId: this.shippingId,
        receiverName: this.formGroup.controls['fullName'].value,
        phone: this.formGroup.controls['phone'].value,
        email: this.formGroup.controls['email'].value,
      })
      .subscribe((rs) => {
        if (rs.errorCode == null) {
          this.router.navigate(['homepage'])
          this.toastrService.success('Đặt hàng thành công!');
        }
      });
  }

  addressData: any;

  getAddressData() {
    this.customerController.getAllAddress().subscribe((rs) => {
      this.addressData = rs.result;
    });
  }

  selectedIndex: number = 0;

  setIndex(index: number, address: any) {
    this.formGroup.patchValue({
      fullName: address.receiverName,
      email: address.email,
      phone: address.phone,
    });
    this.selectedIndex = index;
  }

  getDefaultAddress() {
    this.customerController.getDefaultAddress().subscribe((rs) => {
      this.defaultAddress = rs.result;
    });
  }

  payingMethod: string = '';

  setPayingMethod(event: any) {
    this.payingMethod = event.target.value;
  }

  openDialog() {
    this.dialog
      .open(CreateAddressDialogComponent, {
        width: '35vw',
      })
      .afterClosed()
      .subscribe((rs) => {
        this.getAddressData();
        this.getDefaultAddress();
      });
  }

  numericOnly(event: any): boolean {    
    let patt = /^([0-9])$/;
    let result = patt.test(event.key);
    return result;
}
}

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { CookieService } from 'ngx-cookie-service';
import {
  AuthControllerService,
  CartItem,
  CustomerControllerService,
} from 'src/app/api-svc';
import { CartService } from 'src/app/service/cart.service';
import { CreateAAddressDialogComponent } from '../account-page/address-note-page/create-a-address-dialog/create-a-address-dialog.component';

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
    private authController: AuthControllerService,
    private formBuilder: FormBuilder,
    private dialog: MatDialog
  ) {
    this.formGroup = this.formBuilder.group({
      fullName: [],
      email: [],
      phone: [],
    });
  }

  ngOnInit(): void {
    this.getCustomerCart();
    this.getCustomerData();
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
  customerData: any;

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
    this.customerController
      .checkout({
        addressId: this.selectedIndex,
        cardNumber: this.cardNumber,
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
        console.log(rs);
      });
  }

  getCustomerData() {
    this.authController.getCurrentUser().subscribe((rs) => {
      this.customerData = rs.result;
      this.formGroup.patchValue({
        fullName: this.customerData.result.fullName,
        address: this.customerData.result.address,
        email: this.customerData.result.email,
        phone: this.customerData.result.phone,
      });
    });
  }

  addressData: any;

  getAddressData() {
    this.customerController.getAllAddress().subscribe((rs) => {
      this.addressData = rs.result;
    });
  }

  selectedIndex: number = 0;

  setIndex(index: number) {
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
      .open(CreateAAddressDialogComponent, {
        width: '35vw',
      })
      .afterClosed()
      .subscribe((rs) => {
        this.getAddressData();
        this.getDefaultAddress();
      });
  }
}

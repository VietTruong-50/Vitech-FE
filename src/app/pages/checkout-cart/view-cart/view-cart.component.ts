import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { CategoryControllerService, UserControllerService } from 'src/app/api-svc';

@Component({
  selector: 'app-view-cart',
  templateUrl: './view-cart.component.html',
  styleUrls: ['./view-cart.component.scss'],
})
export class ViewCartComponent implements OnInit {
  constructor(
    private userController: UserControllerService,
    private sanitizer: DomSanitizer,
   
  ) {}

  ngOnInit(): void {
    this.getCartData();
    this.getTotalValue();
  }

  cartData: any;
  cartLength: number = 0;
  total: number = 0;

  getCartData() {
    this.userController.getShoppingCart(10).subscribe((response) => {
      response.result?.cartItems?.forEach((item) => {
        if (item.product!.featureImageByte) {
          let objectURL =
            'data:image/jpeg;base64,' + item.product!.featureImageByte;

          item.product!.imgUrl =
            this.sanitizer.bypassSecurityTrustUrl(objectURL);
        }
      });
      this.cartData = response.result?.cartItems;
      this.cartLength = this.cartData.length;
    });
  }

  getTotalValue(){
    this.userController.getTotalValues(10).subscribe((response) => {
      this.total = response.result!;
    });
  }


}

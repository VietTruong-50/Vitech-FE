import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryControllerService, CustomerControllerService, UserControllerService } from 'src/app/api-svc';
import { UserAccountComponent } from '../user-account/user-account.component';

@Component({
  selector: 'app-homepage-header',
  templateUrl: './homepage-header.component.html',
  styleUrls: ['./homepage-header.component.scss'],
})
export class HomepageHeaderComponent implements OnInit {
  isShowCart: boolean = false;

  currentRoute: string;

  constructor(
    private router: Router,
    private customerController: CustomerControllerService,
    private sanitizer: DomSanitizer,
    private categoryController: CategoryControllerService,
  ) {
    this.currentRoute = this.router.url;
  }

  ngOnInit(): void {
    // this.getCartData();
    // this.getTotalValues();
    this.getCategoriesData()
  }

  showCart() {
    this.isShowCart = !this.isShowCart;
  }

  renderTo(url: string) {
    this.router.navigate([url]);
  }

  cartData: any;
  cartLength: number = 0;

  getCartData() {
    this.customerController.getShoppingCart(1).subscribe((response) => {
      response.result?.cartItems?.forEach((item) => {
        if (item.product!.featureImageByte) {
          let objectURL =
            'data:image/jpeg;base64,' + item.product!.featureImageByte;

          item.product!.imgUrl =
            this.sanitizer.bypassSecurityTrustUrl(objectURL);
        }
        this.cartData = response.result?.cartItems;
        this.cartLength = this.cartData.length;
      });
    });
  }

  totalValues: number = 0;

  getTotalValues() {
    this.customerController.getTotalValues(1).subscribe((response) => {
      this.totalValues = response.result!;
    });
  }

  categoryData: any;

  getCategoriesData(){
    this.categoryController.getAllCategory(10, 0, 'name').subscribe(response => {
      this.categoryData = response.result?.content;
    })
  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CustomerControllerService } from 'src/app/api-svc';

@Component({
  selector: 'app-user-order-detail',
  templateUrl: './user-order-detail.component.html',
  styleUrls: ['./user-order-detail.component.scss'],
})
export class UserOrderDetailComponent implements OnInit {
  orderData: any;

  constructor(
    private customerController: CustomerControllerService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    if (this.route.snapshot.paramMap.get('code') != null) {
      let code = this.route.snapshot.paramMap.get('code');
      this.getOrderDetail(code!);
    }
  }

  getOrderDetail(code: string) {
    this.customerController.getOrderByCode(code).subscribe((rs) => {
      this.orderData = rs.result;
    });
  }
}

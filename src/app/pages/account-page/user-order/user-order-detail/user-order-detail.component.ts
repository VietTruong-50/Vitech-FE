import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerControllerService } from 'src/app/api-svc';

@Component({
  selector: 'app-user-order-detail',
  templateUrl: './user-order-detail.component.html',
  styleUrls: ['./user-order-detail.component.scss'],
})
export class UserOrderDetailComponent implements OnInit {
  orderData: any;
  orderCode: string = '';
  orderStatus: any[] = [
    { value: 'WAITING_PROCESS', viewValue: 'Chờ xử lý' },
    { value: 'WAITING_DELIVERY', viewValue: 'Chờ giao hàng' },
    { value: 'SUCCESS', viewValue: 'Đã hoàn thành' },
    { value: 'CANCEL', viewValue: 'Đã huỷ' },
  ];
  
  constructor(
    private customerController: CustomerControllerService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (this.route.snapshot.paramMap.get('code') != null) {
      this.orderCode = this.route.snapshot.paramMap.get('code')!;
      this.getOrderDetail(this.orderCode!);
    }
  }

  getOrderDetail(code: string) {
    this.customerController.getOrderByCode(code).subscribe((rs) => {
      this.orderData = rs.result;

      console.log(this.orderData)
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { CustomerControllerService, Order } from 'src/app/api-svc';

@Component({
  selector: 'app-user-order',
  templateUrl: './user-order.component.html',
  styleUrls: ['./user-order.component.scss'],
})
export class UserOrderComponent implements OnInit {
  orderStatus: any[] = [
    { value: 'WAITING_PROCESS', viewValue: 'Chờ xử lý' },
    { value: 'WAITING_DELIVERY', viewValue: 'Chờ giao hàng' },
    { value: 'SUCCESS', viewValue: 'Đã hoàn thành' },
    { value: 'CANCEL', viewValue: 'Đã huỷ' },
  ];

  displayedColumns: string[] = [
    'code',
    'date',
    'productName',
    'total',
    'status',
  ];
  dataSource: MatTableDataSource<Order> = new MatTableDataSource();

  constructor(
    private customerController: CustomerControllerService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getOrdersData();
  }
  selectedIndex: number = 1;

  getOrdersData(status?: any, index?: number) {
    this.selectedIndex = index!;
    this.customerController
      .getCurrentOrders(status ? status : 'WAITING_PROCESS', 0, 20, "orderDate")
      .subscribe((rs) => {
        this.dataSource = new MatTableDataSource<Order>(rs.result?.content);
      });
  }
}

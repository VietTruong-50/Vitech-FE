import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import {
  UserControllerService,
  CustomerControllerService,
  Order,
} from 'src/app/api-svc';
import { Location } from '@angular/common';

@Component({
  selector: 'app-invoice-management',
  templateUrl: './invoice-management.component.html',
  styleUrls: ['./invoice-management.component.scss'],
})
export class InvoiceManagementComponent implements OnInit {
  pageIndex: number = 0;
  pageSize: number = 5;

  status = [
    {
      value: 'ALL',
      viewValue: 'Tất cả',
    },
    {
      value: 'WAITING_PROCESS',
      viewValue: 'Chờ xử lý',
    },
    {
      value: 'WAITING_DELIVERY',
      viewValue: 'Chờ giao hàng',
    },
    {
      value: 'SUCCESS',
      viewValue: 'Đã hoàn thành',
    },
    {
      value: 'CANCEL',
      viewValue: 'Đã huỷ',
    },
  ];

  displayedColumns: string[] = [
    'position',
    'invoiceNumber',
    'orderCode',
    'customer',
    'orderDate',
    'status',
    'shippingMethod',
    'total',
    'action',
  ];
  dataSource: MatTableDataSource<any> = new MatTableDataSource();

  constructor(
    private router: Router,
    private location: Location,
    private userController: UserControllerService,
    private customerController: CustomerControllerService
  ) {}

  ngOnInit(): void {
    this.getOrderByStatus();
  }

  onPaginate($event: PageEvent) {
    this.updateUrlPath($event.pageIndex, $event.pageSize);
  }

  ordersData: any;
  statusValue: any;

  setStatus(event: any) {
    this.statusValue = event.target.value;
  }

  getOrderByStatus(pageIndex?: number) {
    this.customerController
      .getCurrentOrders('SUCCESS', pageIndex ? pageIndex : 0, 20, 'orderDate')
      .subscribe((rs) => {
        this.dataSource = new MatTableDataSource<Order>(rs.result?.content);
      });
  }

  orderCode: string = '';

  search() {
    this.userController
      .getAllOrdersByCode(
        this.orderCode ? this.orderCode : '',
        0,
        5,
        'orderDate'
      )
      .subscribe((rs) => {
        this.dataSource = new MatTableDataSource<Order>(rs.result?.content);
      });
  }

  renderTo(type: string, id?: number) {
    this.router.navigate(['/admin/orders', id], {
      queryParams: { type: type },
    });
  }

  updateUrlPath(pageIndex: number, pageSize: number) {
    this.pageIndex = pageIndex;
    this.pageSize = pageSize;
    const pureUrl = this.router.url.split('?').shift();
    this.location.go(`${pureUrl}?pageIndex=${pageIndex}&pageSize=${pageSize}`);

    this.getOrderByStatus(this.pageIndex);
  }
}

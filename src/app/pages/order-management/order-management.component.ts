import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import {
  CustomerControllerService,
  Order,
  UserControllerService,
} from 'src/app/api-svc';

@Component({
  selector: 'app-order-management',
  templateUrl: './order-management.component.html',
  styleUrls: ['./order-management.component.scss'],
})
export class OrderManagementComponent implements OnInit {
  pageIndex: number = 0;
  pageSize: number = 5;

  status = [
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
    'orderCode',
    'customer',
    'orderDate',
    'status',
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
    this.getAllOrdersData();
  }

  onPaginate($event: PageEvent) {
    this.updateUrlPath($event.pageIndex, $event.pageSize);
  }

  ordersData: any;

  getAllOrdersData(pageIndex ?: number) {
    this.userController
      .getAllOrders(pageIndex ? pageIndex : this.pageIndex, 5, 'orderDate')
      .subscribe((rs) => {
        this.ordersData = rs.result?.content;

        this.dataSource = new MatTableDataSource<Order>(rs.result?.content);
      });
  }

  getOrderByStatus() {
    // this.customerController
    //   .getCurrentOrders('WAITING_DELIVERY')
    //   .subscribe((rs) => {
    //     this.ordersData = rs.result;
    //     this.dataSource = new MatTableDataSource<Order>(rs.result);
    //   });
  }

  renderTo(type: string, id?: number) {
    if (type == 'Info') {
      this.router.navigate(['/admin/orders', id], {
        queryParams: { type: type },
      });
    } else if (type == 'Edit') {
      this.router.navigate(['/admin/orders', 'edit-orders', id], {
        queryParams: { type: type },
      });
    } else if (type == 'Add') {
      this.router.navigate(['/admin/orders', 'add-orders'], {
        queryParams: { type: type },
      });
    }
  }

  updateUrlPath(pageIndex: number, pageSize: number) {
    this.pageIndex = pageIndex;
    this.pageSize = pageSize;
    const pureUrl = this.router.url.split('?').shift();
    this.location.go(`${pureUrl}?pageIndex=${pageIndex}&pageSize=${pageSize}`);

    this.getAllOrdersData(pageIndex);
  }
}

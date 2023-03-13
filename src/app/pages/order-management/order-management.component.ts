import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import {
  CustomerControllerService,
  Order,
  UserControllerService,
} from 'src/app/api-svc';
import { DialogService } from 'src/app/service/dialog.service';
import { ToastrService } from 'ngx-toastr';

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
    private customerController: CustomerControllerService,
    private route: ActivatedRoute,
    private dialog: DialogService, 
    private toastrService: ToastrService
  ) {
    if (this.route.snapshot.queryParamMap.get('type')) {
      this.statusValue = this.route.snapshot.queryParamMap.get('type');
    }
  }

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

  getAllOrdersData(pageIndex?: number) {
    this.userController
      .getAllOrders(pageIndex ? pageIndex : this.pageIndex, 20, 'orderDate')
      .subscribe((rs) => {
        this.ordersData = rs.result?.content;

        this.dataSource = new MatTableDataSource<Order>(rs.result?.content);
      });
  }

  getOrderByStatus() {
    if (this.statusValue == 'ALL' || this.statusValue == null) {
      this.getAllOrdersData();
    } else {
      this.customerController
        .getCurrentOrders(this.statusValue, 0, 20, 'orderDate')
        .subscribe((rs) => {
          this.dataSource = new MatTableDataSource<Order>(rs.result?.content);
        });
    }
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

  destroyOrder(id: number) {
    this.dialog.showConfirmDialog({
      width: '20vw',
      title: 'Xoá đơn hàng',
      acceptText: 'Đồng ý',
      rejectText: 'Huỷ',
      description: 'Bạn muốn xoá đơn hàng này?',
      onReject: () => {},
      onAfterClosed: () => {
        this.userController.destroyOrder(id).subscribe((rs) => {
          this.getAllOrdersData()
          this.toastrService.show('Xoá thành công!', 'Đã xoá 1 đơn hàng');
        });
      },
    });
  }
}

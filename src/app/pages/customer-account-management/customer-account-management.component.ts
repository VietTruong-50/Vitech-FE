import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { MatTableDataSource } from '@angular/material/table';
import { Customer, UserControllerService } from 'src/app/api-svc';
import * as moment from 'moment';

@Component({
  selector: 'app-customer-account-management',
  templateUrl: './customer-account-management.component.html',
  styleUrls: ['./customer-account-management.component.scss'],
})
export class CustomerAccountManagementComponent implements OnInit {
  title: string = 'List customer account';
  customerData: any;

  pageIndex: number = 0;
  pageSize: number = 5;
  dataSource: MatTableDataSource<any> = new MatTableDataSource();

  displayedColumns: string[] = [
    'position',
    'userName',
    'email',
    'phone',
    'dateOfBirth',
    'action',
  ];

  constructor(
    private router: Router,
    private location: Location,
    private userController: UserControllerService
  ) {}

  ngOnInit(): void {
    this.getCustomerData();
  }

  getCustomerData(pageIndex?: number) {
    this.userController
      .findAllCustomers(pageIndex ? pageIndex : 0, this.pageSize, 'createdAt')
      .subscribe((rs) => {
        this.customerData = rs.result?.content;

        this.customerData.forEach((item: any) => {
          item.dateOfBirth = moment(new Date(item.dateOfBirth)).format(
            'DD/MM/YYYY'
          );
        });
  
        this.dataSource = new MatTableDataSource<Customer>(rs.result?.content);
      });
  }

  renderTo(type: string, id?: number) {
    if (type == 'Add') {
      this.router.navigate(['/admin/customers', 'add-customer'], {
        queryParams: { type: type },
      });
    } else if ((type = 'Edit')) {
      this.router.navigate(['/admin/customers', 'edit-customer', id], {
        queryParams: { type: type },
      });
    }
  }

  onPaginate($event: PageEvent) {
    this.updateUrlPath($event.pageIndex, $event.pageSize);
  }

  updateUrlPath(pageIndex: number, pageSize: number) {
    this.pageIndex = pageIndex;
    this.pageSize = pageSize;
    const pureUrl = this.router.url.split('?').shift();
    this.location.go(`${pureUrl}?pageIndex=${pageIndex}&pageSize=${pageSize}`);
    this.getCustomerData(this.pageIndex)
  }
}

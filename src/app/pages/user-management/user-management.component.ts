import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { UserControllerService } from 'src/app/api-svc';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss'],
})
export class UserManagementComponent implements OnInit {
  title: string = 'List user';
  userData: any;

  pageIndex: number = 0;
  pageSize: number = 5;

  displayedColumns: string[] = [
    'position',
    'userName',
    'email',
    'role',
    'action',
  ];
  dataSource: MatTableDataSource<any> = new MatTableDataSource();

  constructor(
    private userController: UserControllerService,
    private location: Location,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.userController.getAllUsers(5, 0, 'createdAt').subscribe((response) => {
      this.userData = response.result?.content;
    });
  }
  renderTo(type: string, id?: number) {
    if (type == 'Add') {
      this.router.navigate(['/admin/products', 'add-product'], {
        queryParams: { type: type },
      });
    } else if ((type = 'Edit')) {
      this.router.navigate(['/admin/products', 'edit-product', id], {
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
  }
}

import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Brand, BrandControllerService } from 'src/app/api-svc';

@Component({
  selector: 'app-brand-management',
  templateUrl: './brand-management.component.html',
  styleUrls: ['./brand-management.component.scss'],
})
export class BrandManagementComponent implements OnInit {
  title: string = 'List brand';
  brandData: any;

  pageIndex: number = 0;
  pageSize: number = 5;

  displayedColumns: string[] = ['position', 'name', 'description', 'action'];
  dataSource: MatTableDataSource<Brand> = new MatTableDataSource();

  constructor(
    private brandController: BrandControllerService,
    private router: Router,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.updateUrlPath(0, 10);
  }

  getData(pageIndex?: number) {
    this.brandController
      .getAllBrand(this.pageSize, pageIndex ? pageIndex : 0, 'createdAt')
      .subscribe((response) => {
        this.dataSource = new MatTableDataSource(response.result?.content);
      });
  }

  renderTo(type: string, id?: number) {
    if (type == 'Add') {
      this.router.navigate(['/admin/brands', 'add-brand'], {
        queryParams: { type: type },
      });
    } else if ((type = 'Edit')) {
      this.router.navigate(['/admin/brands', 'edit-brand', id], {
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
    this.getData(this.pageIndex);
  }

  deleteBrand(id: number){

  }
}

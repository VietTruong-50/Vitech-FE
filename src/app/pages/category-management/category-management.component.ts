import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Category, CategoryControllerService } from 'src/app/api-svc';

@Component({
  selector: 'app-category-management',
  templateUrl: './category-management.component.html',
  styleUrls: ['./category-management.component.scss'],
})
export class CategoryManagementComponent implements OnInit {
  title: string = 'List categories';
  categoryData: any;
  
  pageIndex: number = 0;
  pageSize: number = 5;

  displayedColumns: string[] = ['position', 'name', 'description', 'action'];
  dataSource: MatTableDataSource<Category> = new MatTableDataSource();

  constructor(
    private router: Router,
    private categoryController: CategoryControllerService,
    private activatedRoute: ActivatedRoute,
    private location: Location
  ) {
    console.log(this.activatedRoute.root);
  }

  ngOnInit(): void {
    this.updateUrlPath(0, 10);
  }

  getData(pageIndex?: number) {
    this.categoryController
      .getAllCategory(this.pageSize, pageIndex ? pageIndex : 0, 'name')
      .subscribe((response) => {
        this.dataSource = new MatTableDataSource<Category>(
          response.result?.content
        )
      });
  }

  renderTo(type: string, id?: number) {
    if (type == 'Add') {
      this.router.navigate(['/admin/categories', 'add-category'], {
        queryParams: { type: type },
      });
    } else if ((type = 'Edit')) {
      this.router.navigate(['/admin/categories', 'edit-category', id], {
        queryParams: { type: type },
      });
    }
  }

  deleteCategory(id: number){

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
}

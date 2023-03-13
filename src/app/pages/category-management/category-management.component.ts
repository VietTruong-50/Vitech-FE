import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Category, CategoryControllerService } from 'src/app/api-svc';

@Component({
  selector: 'app-category-management',
  templateUrl: './category-management.component.html',
  styleUrls: ['./category-management.component.scss'],
})
export class CategoryManagementComponent implements OnInit {
  title: string = 'Danh sách loại sản phẩm';
  categoryData: any;

  pageIndex: number = 0;
  pageSize: number = 5;

  displayedColumns: string[] = [
    'position',
    // 'image',
    'name',
    // 'parent_id',
    'action',
  ];
  dataSource: MatTableDataSource<Category> = new MatTableDataSource();

  constructor(
    private router: Router,
    private categoryController: CategoryControllerService,
    private activatedRoute: ActivatedRoute,
    private location: Location,
    private sanitizer: DomSanitizer
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
        // response.result?.content?.forEach((item) => {
        //   if (item.categoryImageByte) {
        //     let objectURL = 'data:image/jpeg;base64,' + item.categoryImageByte;

        //     item.imgUrl = this.sanitizer.bypassSecurityTrustUrl(objectURL);
        //   }
        // });

        this.dataSource = new MatTableDataSource<Category>(
          response.result?.content
        );

        this.categoryData = response.result?.content
        console.log(this.categoryData);
        
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

  deleteCategory(id: number) {}

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

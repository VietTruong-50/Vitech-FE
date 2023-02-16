import { Location } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import {
  SubCategoryControllerService,
  CategoryControllerService,
  ProductControllerService,
} from 'src/app/api-svc';
import { Product } from 'src/app/api-svc/model/product';

@Component({
  selector: 'app-product-management',
  templateUrl: './product-management.component.html',
  styleUrls: ['./product-management.component.scss'],
})
export class ProductManagementComponent implements OnInit {
  title: string = 'List products';

  pageIndex: number = 0;
  pageSize: number = 5;

  displayedColumns: string[] = [
    'position',
    'featureImageName',
    'productCode',
    'name',
    'actualPrice',
    'action',
  ];
  dataSource: MatTableDataSource<Product> = new MatTableDataSource();

  constructor(
    private productController: ProductControllerService,
    private router: Router,
    private sanitizer: DomSanitizer,
    private location: Location,
    private categoryController: CategoryControllerService,
    private subCategoryController: SubCategoryControllerService
  ) {}

  ngOnInit(): void {
    this.getCategoryData();
    this.updateUrlPath(0, 5);
  }

  categoryData: any;

  getCategoryData() {
    this.categoryController
      .getAllCategory(30, 0, 'createdAt')
      .subscribe((response) => {
        if (response.errorCode == null) {
          this.categoryData = response.result?.content;
        }
      });
  }

  subCateData: any;

  getBrandData(name: string) {
    this.subCategoryController
      .getSubCategoryDataByCategory([name])
      .subscribe((response) => {
        if (response.errorCode == null) {
          this.subCateData = response.result;
        }
      });
  }

  categorySearch: string = 'Phân loại';

  onChange(deviceValue: any) {
    let id = deviceValue.target.value;
    this.categorySearch = id;
    console.log(this.categorySearch);

    this.getBrandData(id);
  }

  getData(pageIndex?: number) {
    this.productController
      .getAllProduct(this.pageSize, pageIndex ? pageIndex : 0, 'name')
      .subscribe((response) => {
        response.result?.content?.forEach((item) => {
          if (item.featureImageByte) {
            let objectURL = 'data:image/jpeg;base64,' + item.featureImageByte;

            item.imgUrl = this.sanitizer.bypassSecurityTrustUrl(objectURL);
          }
        });

        this.dataSource = new MatTableDataSource<Product>(
          response.result?.content
        );
      });
  }

  deleteProduct(id: number) {
    this.productController.deleteProduct(id).subscribe((response) => {
      if (response.errorCode == null) {
        this.getData();
        window.alert('Delete success');
      }
    });
  }

  findAllByCategory(pageIndex?: number) {
    if (this.categorySearch != 'Phân loại') {
      this.productController
        .findProductsByCategoryName(
          this.categorySearch,
          this.pageSize,
          pageIndex ? pageIndex : 0,
          'name'
        )
        .subscribe((response) => {
          response.result?.content?.forEach((item) => {
            if (item.featureImageByte) {
              let objectURL = 'data:image/jpeg;base64,' + item.featureImageByte;

              item.imgUrl = this.sanitizer.bypassSecurityTrustUrl(objectURL);
            }
          });

          this.dataSource = new MatTableDataSource<Product>(
            response.result?.content
          );
        });
      return;
    }
    this.getData(pageIndex ? pageIndex : 0);
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

    if (this.categorySearch != 'Phân loại') {
      this.findAllByCategory(pageIndex);
    } else {
      this.search(this.pageIndex);
    }
  }

  productCode: string = '';

  search(pageIndex?: number) {
    if (this.productCode != '') {
      this.productController
        .getAllProductsByCode(
          this.productCode,
          pageIndex ? pageIndex : 0,
          this.pageSize,
          'name'
        )
        .subscribe((rs) => {
          rs.result?.content?.forEach((item) => {
            if (item.featureImageByte) {
              let objectURL = 'data:image/jpeg;base64,' + item.featureImageByte;

              item.imgUrl = this.sanitizer.bypassSecurityTrustUrl(objectURL);
            }
          });

          this.dataSource = new MatTableDataSource<Product>(rs.result?.content);
        });
    } else {
      this.getData(pageIndex);
    }
  }
}

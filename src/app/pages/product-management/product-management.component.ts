import { Location } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import {
  SubCategoryControllerService,
  CategoryControllerService,
  ProductControllerService,
  CustomerControllerService,
} from 'src/app/api-svc';
import { Product } from 'src/app/api-svc/model/product';
import { DialogService } from 'src/app/service/dialog.service';

@Component({
  selector: 'app-product-management',
  templateUrl: './product-management.component.html',
  styleUrls: ['./product-management.component.scss'],
})
export class ProductManagementComponent implements OnInit {
  title: string = 'Danh sách sản phẩm';

  pageIndex: number = 0;
  pageSize: number = 5;

  displayedColumns: string[] = [
    'position',
    'featureImageName',
    'productCode',
    'name',
    'quantity',
    'actualPrice',
    'action',
  ];
  dataSource: MatTableDataSource<Product> = new MatTableDataSource();

  constructor(
    private productController: ProductControllerService,
    private customerController: CustomerControllerService,
    private router: Router,
    private sanitizer: DomSanitizer,
    private location: Location,
    private categoryController: CategoryControllerService,
    private subCategoryController: SubCategoryControllerService,
    private dialogService: DialogService,
    private toastrService: ToastrService
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
    let name = deviceValue.target.value;
    this.categorySearch = name;
    this.subCateName = '';

    this.getBrandData(name);
  }

  subCateName: string = '';

  onChangeSubCate(deviceValue: any) {
    this.subCateName = deviceValue.target.value;
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
    this.dialogService.showConfirmDialog({
      width: '20vw',
      title: 'Xoá sản phẩm',
      acceptText: 'Đồng ý',
      rejectText: 'Huỷ',
      description: 'Bạn muốn xoá sản phẩm này?',
      onReject: () => {},
      onAfterClosed: () => {
        this.productController.deleteProduct(id).subscribe((response) => {
          if (response.errorCode == null) {
            this.getData();
            this.toastrService.show('Xoá thành công!', 'Đã xoá 1 sản phẩm');
          }
        });
      },
    });
  }

  findAllByCategory(pageIndex?: number) {
    if (this.categorySearch != 'Phân loại') {
      console.log(pageIndex);
      
      this.customerController
        .filterProduct(
          pageIndex ? pageIndex : 0,
          this.pageSize,
          'name',
          [this.categorySearch],
          this.subCateName ? [this.subCateName] : [],
          0,
          100000000,
          ' '
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

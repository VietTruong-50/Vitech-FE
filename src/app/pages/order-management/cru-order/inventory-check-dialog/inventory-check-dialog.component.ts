import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Product, ProductControllerService } from 'src/app/api-svc';

@Component({
  selector: 'app-inventory-check-dialog',
  templateUrl: './inventory-check-dialog.component.html',
  styleUrls: ['./inventory-check-dialog.component.scss'],
})
export class InventoryCheckDialogComponent implements OnInit {
  dataSource: MatTableDataSource<any> = new MatTableDataSource();

  displayedColumns: string[] = [
    'position',
    'productCode',
    'name',
    'actualPrice',
    'quantity',
    'status',
  ];

  pageIndex: number = 0;
  pageSize: number = 10;

  constructor(private productController: ProductControllerService) {}

  ngOnInit(): void {
    this.getProductData();
  }

  searchText: string = '';

  getProductData(pageIndex?: number) {
    this.productController
      .getAllProduct(
        this.pageSize,
        pageIndex ? pageIndex : this.pageIndex,
        'name'
      )
      .subscribe((rs) => {
        this.dataSource = new MatTableDataSource<Product>(rs.result?.content);
      });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onPaginate($event: PageEvent) {
    this.getProductData($event.pageIndex);
  }
}

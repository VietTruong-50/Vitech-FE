import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductControllerService } from 'src/app/api-svc';

@Component({
  selector: 'app-product-management',
  templateUrl: './product-management.component.html',
  styleUrls: ['./product-management.component.scss'],
})
export class ProductManagementComponent implements OnInit {
  title: string = 'List products';
  productData: any;

  constructor(private productController: ProductControllerService, private router: Router) {}

  ngOnInit(): void {
    this.getData()
  }

  getData() {
    this.productController.getAllProduct(5, 0, "name").subscribe((response) => {
      this.productData = response.result?.content
    });
  }

  renderTo(type:string, id?: number,){
    if(type == 'Add'){
      this.router.navigate(['/admin/products', 'add-product'], {queryParams : {type: type}});
    }else if(type = 'Edit'){
      this.router.navigate(['/admin/products', 'edit-product', id], {queryParams : {type: type}});
    }
  }
}

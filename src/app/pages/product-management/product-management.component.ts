import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
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
  imgSrc: SafeUrl | undefined;

  constructor(
    private productController: ProductControllerService,
    private router: Router,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.productController.getAllProduct(5, 0, 'name').subscribe((response) => {
      this.productData = response.result?.content;
      response.result?.content?.forEach((item) => {
        if (item.featureImageByte) {
          let objectURL = 'data:image/jpeg;base64,' + item.featureImageByte;

          this.imgSrc = this.sanitizer.bypassSecurityTrustUrl(objectURL);
        }
      });
    });
  }

  deleteProduct(id: number){
    this.productController.deleteProduct(id).subscribe(response => {
      if(response.errorCode == null){
        this.getData();
        window.alert("Delete success")
      }
    })
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
}

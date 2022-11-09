import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BrandControllerService, ProductControllerService } from 'src/app/api-svc';

@Component({
  selector: 'app-cru-product',
  templateUrl: './cru-product.component.html',
  styleUrls: ['./cru-product.component.scss'],
})
export class CruProductComponent implements OnInit {
  title: string = 'Add product';
  formGroup: FormGroup;
  imageSrc: string | undefined;
  id: string | null = '';
  imageDomain = '../../../assets/image/products/';
  brandData: any;

  constructor(
    private formBuilder: FormBuilder,
    private productController: ProductControllerService,
    private route: ActivatedRoute,
    private router: Router,
    private brandController: BrandControllerService
  ) {
    this.formGroup = this.formBuilder.group({
      name: [],
      content: [],
      price: [],
      feature_img: [],
      images: [],
      quantity: [],
      categoryId: [],
      brand: []
    });

    if (this.route.snapshot.paramMap.get('id') != null) {
      this.id = this.route.snapshot.paramMap.get('id');

      this.productController
        .findProductById(Number(this.id))
        .subscribe((response) => {
          if(response.errorCode == null){
            console.log(response.result);
            
            this.formGroup.patchValue({
              name: response.result?.name,
              content: response.result?.content,
              price: response.result?.actualPrice,
              quantity: response.result?.quantity,
              categoryId: response.result?.category?.id,
              images: response.result?.productImages,
              brand: response.result?.brand
            });
  
            this.imageSrc =
              this.imageDomain +
              this.id +
              '/feature_img/' +
              response.result?.featureImageName;
  
            response.result?.productImages?.forEach((img) => {
              this.listImg.push(
                this.imageDomain + this.id + '/details/' + img.imageName
              );
            });
          }
        });
    }
  }

  ngOnInit(): void {
    this.getBrandData()
  }

  readURL(event: any): void {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      this.formGroup.controls['feature_img'].setValue(file);

      const reader = new FileReader();
      reader.onload = (e) => {
        this.imageSrc = e.target?.result as string;
      };

      reader.readAsDataURL(file);
    }
  }

  listImg: string[] = [];
  fileList: any[] = [];
  readURLs(event: any) {
    if (event.target.files && event.target.files[0]) {
      for (var i = 0; i < event.target.files.length; i++) {
        this.fileList.push(event.target.files[i]);
      }
      this.formGroup.controls['images'].setValue(this.fileList);
      this.listImg = [];
      for (var img of event.target.files) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.listImg.push(e.target?.result as string);
        };

        reader.readAsDataURL(img);
      }
    }
  }

  addProduct() {
    let data = this.formGroup.getRawValue();
    console.log(data);

    // this.productController
    //   .createNewProduct(
    //     {
    //       name: data.name,
    //       content: data.content,
    //       actualPrice: data.price,
    //       quantity: data.quantity,
    //       brand_id: data.brandId
    //     },
    //     data.feature_img,
    //     this.formGroup.controls['images'].value
    //   )
    //   .subscribe((response) => {
    //     if (response.errorCode == null) {
    //       this.router.navigate(['/admin/products']);
    //       console.log(response.result);
    //     }
    //   });
  }

  updateProduct() {
    let data = this.formGroup.getRawValue();
    console.log(data);

    this.productController
      .updateProduct(
        Number(this.id),
        {
          name: data.name,
          content: data.content,
          actualPrice: data.price,
          quantity: data.quantity,
        },
        data.feature_img,
        data.images
      )
      .subscribe((response) => {
        if (response.errorCode == null) {
          this.router.navigate(['/admin/products']);
          console.log(response.result);
        }
      });
  }

  getBrandData(){
    this.brandController.getBrandData().subscribe(response => {
      if(response.errorCode == null){
        this.brandData = response.result;
      }
    })
  }
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import {
  BrandControllerService,
  CategoryControllerService,
  ProductControllerService,
} from 'src/app/api-svc';

@Component({
  selector: 'app-cru-product',
  templateUrl: './cru-product.component.html',
  styleUrls: ['./cru-product.component.scss'],
})
export class CruProductComponent implements OnInit {
  title: string = 'Add product';
  formGroup: FormGroup;
  imageSrc!: string | SafeUrl;
  id: string | null = '';
  brandData: any;
  categoryData: any;
  // imageDomain = '../../../assets/image/products/';

  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '25rem',
    minHeight: '5rem',
    placeholder: 'Enter text here...',
    translate: 'no',
    defaultParagraphSeparator: 'p',
    defaultFontName: 'Arial',
    toolbarHiddenButtons: [['bold']],
    customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText',
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ],
  };

  constructor(
    private formBuilder: FormBuilder,
    private productController: ProductControllerService,
    private route: ActivatedRoute,
    private router: Router,
    private brandController: BrandControllerService,
    private sanitizer: DomSanitizer,
    private categoryController: CategoryControllerService
  ) {
    this.formGroup = this.formBuilder.group({
      name: [],
      code: [],
      parameters: [],
      content: [],
      price: [],
      discountPrice: [],
      feature_img: [],
      images: [],
      quantity: [],
      categoryId: [],
      brandId: [],
    });
  }

  ngOnInit(): void {
    this.getCategoryData();

    if (this.route.snapshot.paramMap.get('id') != null) {
      this.id = this.route.snapshot.paramMap.get('id');
      this.getProductById();
    }
  }

  getProductById() {
    this.productController
      .findProductById(Number(this.id))
      .subscribe((response) => {
        if (response.errorCode == null) {
          console.log(response.result);

          if (response.result?.featureImageByte) {
            let objectURL =
              'data:image/jpeg;base64,' + response.result.featureImageByte;

            this.imageSrc = this.sanitizer.bypassSecurityTrustUrl(objectURL);
          }

          response.result?.productImages?.forEach((img) => {
            let objectURL = 'data:image/jpeg;base64,' + img.imageByte;

            let itemSrc = this.sanitizer.bypassSecurityTrustUrl(objectURL);

            this.listPreviewImg.push(itemSrc);
          });

          this.formGroup.patchValue({
            name: response.result?.name,
            code: response.result?.productCode,
            parameters: response.result?.parameters,
            content: response.result?.content,
            price: response.result?.actualPrice,
            quantity: response.result?.quantity,
            categoryId: response.result?.brand?.category?.id,
            brandId: response.result?.brand?.id,
          });

          this.getBrandData(this.formGroup.controls['categoryId'].value);
        }
      });
  }

  getBrandData(id: number) {
    this.brandController.getBrandDataByCategory(id).subscribe((response) => {
      if (response.errorCode == null) {
        this.brandData = response.result;
      }
    });
  }

  getCategoryData() {
    this.categoryController
      .getAllCategory(30, 0, 'createdAt')
      .subscribe((response) => {
        if (response.errorCode == null) {
          this.categoryData = response.result?.content;
        }
      });
  }

  onChange(deviceValue: any) {
    let id = deviceValue.target.value;
    console.log(id);
    this.getBrandData(id);
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

  listPreviewImg: SafeUrl[] = [];
  fileList: any[] = [];

  readURLs(event: any) {
    if (event.target.files && event.target.files[0]) {
      for (var i = 0; i < event.target.files.length; i++) {
        this.fileList.push(event.target.files[i]);
      }

      this.formGroup.controls['images'].setValue(this.fileList);
      this.listPreviewImg = [];

      for (var img of event.target.files) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.listPreviewImg.push(e.target?.result as string);
        };

        reader.readAsDataURL(img);
      }
    }
  }

  addProduct() {
    let data = this.formGroup.getRawValue();
    console.log(data);

    this.productController
      .createNewProduct(
        {
          name: data.name ? data.name : 'null',
          content: data.content ? data.content : 'null',
          actualPrice: data.price ? data.price : 0,
          quantity: data.quantity ? data.quantity : 0,
          productCode: data.code ? data.code : '',
          parameters: data.parameters ? data.parameters : '',
          discountPrice: data.discountPrice ? data.discountPrice: 0,
          // category_id: data.categoryId ? data.categoryId : 0,
          brand_id: data.brandId ? data.brandId : null,
        },
        data.feature_img,
        this.formGroup.controls['images'].value
      )
      .subscribe((response) => {
        if (response.errorCode == null) {
          this.router.navigate(['/admin/products']);
          console.log(response.result);
        }
      });
  }

  updateProduct() {
    let data = this.formGroup.getRawValue();
    console.log(data);

    this.productController
      .updateProduct(
        Number(this.id),
        {
          name: data.name ? data.name : 'null',
          content: data.content ? data.content : 'null',
          actualPrice: data.price ? data.price : 0,
          quantity: data.quantity ? data.quantity : 0,
          productCode: data.code ? data.code : '',
          parameters: data.parameters ? data.parameters : '',
          discountPrice: data.discountPrice ? data.discountPrice: 0,
          // category_id: data.categoryId ? data.categoryId : 0,
          brand_id: data.brandId ? data.brandId : null,
        },
        data.feature_img,
        data.images ? data.images : null
      )
      .subscribe((response) => {
        if (response.errorCode == null) {
          this.router.navigate(['/admin/products']);
          console.log(response.result);
        }
      });
  }
}

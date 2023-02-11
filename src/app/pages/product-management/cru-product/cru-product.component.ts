import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { Editor, toHTML, Toolbar } from 'ngx-editor';
import {
  CategoryControllerService,
  ProductControllerService,
  SubCategoryControllerService,
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

  editor: Editor;
  editor2: Editor;

  toolbar: Toolbar = [
    ['bold', 'italic'],
    ['underline', 'strike'],
    ['code', 'blockquote'],
    ['ordered_list', 'bullet_list'],
    [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
    ['link', 'image'],
    ['text_color', 'background_color'],
    ['align_left', 'align_center', 'align_right', 'align_justify'],
  ];

  toolbar2: Toolbar = [
    ['bold', 'italic'],
    ['underline', 'strike'],
    ['code', 'blockquote'],
    ['ordered_list', 'bullet_list'],
    [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
    ['link', 'image'],
    ['text_color', 'background_color'],
    ['align_left', 'align_center', 'align_right', 'align_justify'],
  ];


  html: string = '';

  // editorConfig: AngularEditorConfig = {
  //   editable: true,
  //   spellcheck: true,
  //   height: '18rem',
  //   minHeight: '5rem',
  //   placeholder: 'Enter text here...',
  //   translate: 'no',
  //   defaultParagraphSeparator: 'p',
  //   defaultFontName: 'Arial',
  //   toolbarHiddenButtons: [['bold']],
  //   customClasses: [
  //     {
  //       name: 'quote',
  //       class: 'quote',
  //     },
  //     {
  //       name: 'redText',
  //       class: 'redText',
  //     },
  //     {
  //       name: 'titleText',
  //       class: 'titleText',
  //       tag: 'h1',
  //     },
  //   ],
  // };

  constructor(
    private formBuilder: FormBuilder,
    private productController: ProductControllerService,
    private route: ActivatedRoute,
    private router: Router,
    private subCategoryController: SubCategoryControllerService,
    private sanitizer: DomSanitizer,
    private categoryController: CategoryControllerService
  ) {
    this.formGroup = this.formBuilder.group({
      name: [],
      code: [],
      parameters: [],
      content: [],
      price: [],
      shortDescription: [],
      feature_img: [],
      images: [],
      quantity: [],
      categoryName: [],
      brandId: [],
    });

    this.title = this.route.snapshot.queryParamMap.get('type')! + ' product';
    this.editor = new Editor();
    this.editor2 = new Editor();
  }

  ngOnInit(): void {
    this.getCategoryData();

    if (this.route.snapshot.paramMap.get('id') != null) {
      this.id = this.route.snapshot.paramMap.get('id');
      this.getProductById();
    }
  }

  // make sure to destory the editor
  ngOnDestroy(): void {
    this.editor.destroy();
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
            categoryName: response.result?.subCategory?.category?.name,
            brandId: response.result?.subCategory?.id,
          });

          this.getBrandData(this.formGroup.controls['categoryName'].value);
        }
      });
  }

  getBrandData(name: string) {
    this.subCategoryController
      .getSubCategoryDataByCategory([name])
      .subscribe((response) => {
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

  onChangeBrand(event: any){
    this.formGroup.controls['brandId'].setValue(event.target.value)
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
          content: data.content ? toHTML(data.content) : 'null',
          actualPrice: data.price ? data.price : 0,
          quantity: data.quantity ? data.quantity : 0,
          productCode: data.code ? data.code : '',
          parameters: data.parameters ? toHTML(data.parameters) : '',
          shortDescription: data.shortDescription ? data.shortDescription : '',
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
          shortDescription: data.shortDescription ? data.shortDescription : '',
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

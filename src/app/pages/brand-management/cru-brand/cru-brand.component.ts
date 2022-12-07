import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BrandControllerService, CategoryControllerService } from 'src/app/api-svc';

@Component({
  selector: 'app-cru-brand',
  templateUrl: './cru-brand.component.html',
  styleUrls: ['./cru-brand.component.scss'],
})
export class CruBrandComponent implements OnInit {
  title: string | null = '';
  formGroup: FormGroup;
  id: string | null = '';

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private brandController: BrandControllerService,
    private categoryController: CategoryControllerService
  ) {
    this.title = this.route.snapshot.queryParamMap.get('type') + ' brand';
    this.formGroup = this.formBuilder.group({
      brandName: [],
      description: [],
      category: []
    });
    if (this.route.snapshot.paramMap.get('id') != null) {
      this.id = this.route.snapshot.paramMap.get('id');

      this.brandController
        .getBrandById(Number(this.id))
        .subscribe((response) => {
          if (response.errorCode == null) {
            this.formGroup.patchValue({
              brandName: response.result?.brandName,
              description: response.result?.description,
              category: response.result?.category?.id
            });
          }
        });
    }
  }

  ngOnInit(): void {
    this.getCategoryData();
  }

  cateData: any;

  getCategoryData() {
    this.categoryController
      .getAllCategory(30, 0, 'createdAt')
      .subscribe((reponse) => {
        if (reponse.errorCode == null) {
          this.cateData = reponse.result?.content;
        }
      });
  }


  addBrand() {
    this.brandController
      .createNewBrand({
        brandName: this.formGroup.controls['brandName'].value,
        description: this.formGroup.controls['description'].value,
        categoryId: this.formGroup.controls['category'].value
      })
      .subscribe((response) => {
        if (response.errorCode == null) {
          this.router.navigate(['/admin/brands']);
        }
      });
  }

  updateBrand() {
    this.brandController.updateBrand(Number(this.id), {
      brandName: this.formGroup.controls['brandName'].value,
      description: this.formGroup.controls['description'].value,
      categoryId: this.formGroup.controls['category'].value
    }).subscribe(response => {
      if (response.errorCode == null) {
        this.router.navigate(['/admin/brands']);
      }
    });
  }
}

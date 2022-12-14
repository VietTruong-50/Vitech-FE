import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryControllerService, SubCategoryControllerService } from 'src/app/api-svc';

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
    private subCategoryController: SubCategoryControllerService,
    private categoryController: CategoryControllerService
  ) {
    this.title = this.route.snapshot.queryParamMap.get('type') + ' brand';
    this.formGroup = this.formBuilder.group({
      subCateName: [],
      description: [],
      category: []
    });
    if (this.route.snapshot.paramMap.get('id') != null) {
      this.id = this.route.snapshot.paramMap.get('id');

      this.subCategoryController
        .getSubCategoryById(Number(this.id))
        .subscribe((response) => {
          if (response.errorCode == null) {
            this.formGroup.patchValue({
              subCateName: response.result?.subCateName,
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
    this.subCategoryController
      .createNewSubCategory({
        subCateName: this.formGroup.controls['subCateName'].value,
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
    this.subCategoryController.updateSubCategory(Number(this.id), {
      subCateName: this.formGroup.controls['subCateName'].value,
      description: this.formGroup.controls['description'].value,
      categoryId: this.formGroup.controls['category'].value
    }).subscribe(response => {
      if (response.errorCode == null) {
        this.router.navigate(['/admin/brands']);
      }
    });
  }
}

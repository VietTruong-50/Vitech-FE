import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryControllerService } from 'src/app/api-svc';

@Component({
  selector: 'app-cru-category',
  templateUrl: './cru-category.component.html',
  styleUrls: ['./cru-category.component.scss'],
})
export class CruCategoryComponent implements OnInit {
  title: string = '';
  formGroup: FormGroup;
  id: string | null = '';

  constructor(
    private formBuilder: FormBuilder,
    private categoryController: CategoryControllerService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.title = this.route.snapshot.queryParamMap.get('type') + ' category';

    this.formGroup = this.formBuilder.group({
      id: [],
      name: [],
      parent_id: [],
      description: [],
    });

    if (route.snapshot.paramMap.get('id') != null) {
      this.id = route.snapshot.paramMap.get('id');

      this.categoryController
        .getCategoryById(Number(this.id))
        .subscribe((response) => {
          if (response.errorCode == null) {

            this.formGroup.patchValue({
              id: response.result?.id,
              name: response.result?.name?.toUpperCase(),
              parent_id: response.result?.parent_id,
              description: response.result?.description,
            });

          }
        });
    }
  }

  ngOnInit(): void {
    this.getFilterData();
  }

  cateData: any;
  cateParent: any;

  getFilterData() {
    this.categoryController
      .getAllCategory(30, 0, 'createdAt')
      .subscribe((reponse) => {
        if (reponse.errorCode == null) {
          this.cateParent = reponse.result?.content?.filter(
            (item) => item.id == this.formGroup.controls['parent_id'].value
          );
          this.cateData = reponse.result?.content;
          console.log(this.cateParent);
        }
      });
  }

  addCategory() {
    let data = this.formGroup.getRawValue()
    this.categoryController
      .createNewCategory({
        name: data.name ? data.name : "",
        description: data.description ? data.description : "",
        parent_id: data.parent_id
          ? data.parent_id
          : 0,
      })
      .subscribe((response) => {
        if (response.errorCode == null) {
          this.router.navigate(['admin/categories']);
        }
      });
  }

  updateCategory(){
    let data = this.formGroup.getRawValue()
    this.categoryController
      .updateCategory(Number(this.id) ,{
        name: data.name ? data.name : "",
        description: data.description ? data.description : "",
        parent_id: data.parent_id
          ? data.parent_id
          : 0,
      })
      .subscribe((response) => {
        if (response.errorCode == null) {
          this.router.navigate(['admin/categories']);
        }
      });
  }
}

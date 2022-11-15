import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryControllerService } from 'src/app/api-svc';

@Component({
  selector: 'app-category-management',
  templateUrl: './category-management.component.html',
  styleUrls: ['./category-management.component.scss'],
})
export class CategoryManagementComponent implements OnInit {
  title: string = 'List categories';
  categoryData: any;

  constructor(
    private router: Router,
    private categoryController: CategoryControllerService,
    private activatedRoute: ActivatedRoute
  ) {
    console.log(this.activatedRoute.root);
  }

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.categoryController
      .getAllCategory(5, 0, 'name')
      .subscribe((response) => {
        this.categoryData = response.result?.content;
      });
  }

  renderTo(type: string, id?: number) {
    if (type == 'Add') {
      this.router.navigate(['/admin/categories', 'add-category'], {
        queryParams: { type: type },
      });
    } else if ((type = 'Edit')) {
      this.router.navigate(['/admin/categories', 'edit-category', id], {
        queryParams: { type: type },
      });
    }
  }
}

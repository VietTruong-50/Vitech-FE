import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryControllerService } from 'src/app/api-svc';

@Component({
  selector: 'app-homepage-footer',
  templateUrl: './homepage-footer.component.html',
  styleUrls: ['./homepage-footer.component.scss'],
})
export class HomepageFooterComponent implements OnInit {
  constructor(
    private router: Router,
    private categoryController: CategoryControllerService
  ) {}

  ngOnInit(): void {
    this.getCategoriesData();
  }

  categoriesData: any;

  getCategoriesData() {
    this.categoryController.getAllCategory(20, 0, 'name').subscribe((rs) => {
      this.categoriesData = rs.result?.content;
    });
  }

  search(categorySearch: string) {
    this.router.navigate([
      '/store',
      { categorySearch: categorySearch, searchText: ' ' },
    ]);
  }
}

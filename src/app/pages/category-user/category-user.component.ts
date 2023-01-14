import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { CategoryControllerService } from 'src/app/api-svc';

@Component({
  selector: 'app-category-user',
  templateUrl: './category-user.component.html',
  styleUrls: ['./category-user.component.scss'],
})
export class CategoryUserComponent implements OnInit {
  categoryData: any;

  constructor(
    private categoryController: CategoryControllerService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.categoryController
      .getAllCategory(20, 0, 'name')
      .subscribe((response) => {
        // response.result?.content?.forEach((item) => {
        //   if (item.categoryImageByte) {
        //     let objectURL = 'data:image/jpeg;base64,' + item.categoryImageByte;

        //     item.imgUrl = this.sanitizer.bypassSecurityTrustUrl(objectURL);
        //   }
        // });
        
        this.categoryData = response.result?.content;
      });
  }
}

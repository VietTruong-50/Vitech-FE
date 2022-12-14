import { Component, OnInit } from '@angular/core';
import { SubCategoryControllerService } from 'src/app/api-svc';

@Component({
  selector: 'app-brand-user',
  templateUrl: './brand-user.component.html',
  styleUrls: ['./brand-user.component.scss']
})
export class BrandUserComponent implements OnInit {

  brandsData: any;

  constructor(private subCategoryController: SubCategoryControllerService) { }

  ngOnInit(): void {
    this.getData()
  }

  getData(){
    // this.subCategoryController.getBrandData().subscribe(response => {
    //   this.brandsData = response.result;
    // })
  }

}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryControllerService } from 'src/app/api-svc';

@Component({
  selector: 'app-category-management',
  templateUrl: './category-management.component.html',
  styleUrls: ['./category-management.component.scss']
})
export class CategoryManagementComponent implements OnInit {

  title: string = 'List categories'
  categoryData: any; 
  constructor(private router: Router, private categoryController: CategoryControllerService) { }

  ngOnInit(): void {
    this.getData()
  }

  getData(){
    this.categoryController.getAllCategory(5, 0, 'name').subscribe(response => {
      this.categoryData = response.result?.content
    })
  }

  renderTo(type:string, id?: number,){
    if(type == 'Add'){
      this.router.navigate(['/admin/banners', 'add-banner'], {queryParams : {type: type}});
    }else if(type = 'Edit'){
      this.router.navigate(['/admin/banners', 'edit-banner', id], {queryParams : {type: type}});
    }
  }
}

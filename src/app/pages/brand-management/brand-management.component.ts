import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BrandControllerService } from 'src/app/api-svc';

@Component({
  selector: 'app-brand-management',
  templateUrl: './brand-management.component.html',
  styleUrls: ['./brand-management.component.scss'],
})
export class BrandManagementComponent implements OnInit {
  title: string = 'List brand';
  brandData: any;

  constructor(private brandController: BrandControllerService, private router: Router) {
    
  }

  ngOnInit(): void {
    this.getData()
  }

  getData(){
    this.brandController.getAllBrand(5, 0 , 'createdAt').subscribe(response => {
      this.brandData = response.result?.content;
    })
  }

  renderTo(type:string, id?: number,){
    if(type == 'Add'){
      this.router.navigate(['/admin/brands', 'add-brand'], {queryParams : {type: type}});
    }else if(type = 'Edit'){
      this.router.navigate(['/admin/brands', 'edit-brand', id], {queryParams : {type: type}});
    }
  }
}

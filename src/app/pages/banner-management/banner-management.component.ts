import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BannerControllerService } from 'src/app/api-svc';

@Component({
  selector: 'app-banner-management',
  templateUrl: './banner-management.component.html',
  styleUrls: ['./banner-management.component.scss']
})
export class BannerManagementComponent implements OnInit {
  title: string = 'List banner';
  bannerData: any;
  
  constructor(private bannerController: BannerControllerService,private router: Router) { }

  ngOnInit(): void {
    this.getData();
  }

  getData(){
    this.bannerController
    .getAllBanner(5, 0, "name")
    .subscribe(response => {
      this.bannerData = response.result?.content;
    })
  }

  deleteBanner(id: number){
    this.bannerController
    .deleteBanner(id)
    .subscribe(response => {
      this.getData();
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

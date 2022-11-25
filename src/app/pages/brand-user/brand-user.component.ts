import { Component, OnInit } from '@angular/core';
import { BrandControllerService } from 'src/app/api-svc';

@Component({
  selector: 'app-brand-user',
  templateUrl: './brand-user.component.html',
  styleUrls: ['./brand-user.component.scss']
})
export class BrandUserComponent implements OnInit {

  brandsData: any;

  constructor(private brandController: BrandControllerService) { }

  ngOnInit(): void {
    this.getData()
  }

  getData(){
    this.brandController.getBrandData().subscribe(response => {
      this.brandsData = response.result;
    })
  }

}

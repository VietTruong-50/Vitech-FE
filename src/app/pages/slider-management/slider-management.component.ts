import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SliderControllerService } from 'src/app/api-svc';

@Component({
  selector: 'app-slider-management',
  templateUrl: './slider-management.component.html',
  styleUrls: ['./slider-management.component.scss'],
})
export class SliderManagementComponent implements OnInit {
  sliderData: any;

  constructor(private sliderController: SliderControllerService, private router: Router) {}

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.sliderController.getAllSlider().subscribe((res) => {
      this.sliderData = res.result;
    });
  }

  renderTo(type: string, id?: number){
    if(type == 'Add'){
      this.router.navigate(['/add-slider']);
    }else if(type = 'Edit'){
      this.router.navigate(['/add-slider', id]);
    }
  }
}

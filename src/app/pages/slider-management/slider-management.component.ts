import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SliderControllerService } from 'src/app/api-svc';

@Component({
  selector: 'app-slider-management',
  templateUrl: './slider-management.component.html',
  styleUrls: ['./slider-management.component.scss'],
})
export class SliderManagementComponent implements OnInit {
  title: string = 'List slider';
  sliderData: any;

  constructor(private sliderController: SliderControllerService, private router: Router) {}

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.sliderController.getAllSlider(5, 0, "name").subscribe((res) => {
      this.sliderData = res.result?.content;
    });
  }

  deleteSlider(id: number){
    this.sliderController.deleteSlider(id)
    .subscribe(response => {
      if(response.errorCode == null){
        window.alert("Delete successfully")
        this.getData();
      } 
    })
  }

  renderTo(type: string, id?: number){
    if(type == 'Add'){
      this.router.navigate(['/admin/sliders', 'add-slider'], {queryParams : {type: type}});
    }else if(type = 'Edit'){
      this.router.navigate(['/admin/sliders', 'edit-slider', id], {queryParams : {type: type}});
    }
  }
}

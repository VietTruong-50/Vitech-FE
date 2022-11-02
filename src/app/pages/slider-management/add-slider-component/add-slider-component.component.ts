import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SliderControllerService } from 'src/app/api-svc';

@Component({
  selector: 'app-add-slider-component',
  templateUrl: './add-slider-component.component.html',
  styleUrls: ['./add-slider-component.component.scss'],
})
export class AddSliderComponentComponent implements OnInit {
  formGroup: FormGroup;
  imageSrc: string | ArrayBuffer = '';
  
  constructor(
    private formBuilder: FormBuilder,
    private sliderController: SliderControllerService
  ) {
    this.formGroup = this.formBuilder.group({
      id: [],
      name: [],
      description: [],
      image: [],
    });
  }

  ngOnInit(): void {}

  createSlider() {
    console.log(this.formGroup.getRawValue());
    this.sliderController
      .createNewSlider(
        {
          name: this.formGroup.controls['name'].value,
          description: this.formGroup.controls['description'].value,
        },
        this.formGroup.controls['image'].value
      )
      .subscribe((response) => {
        if (response.errorCode == null) {
          console.log(response.result);
        } else {
          console.log('Error');
        }
      });
  }

  updateSlider(){
    this.sliderController.updateSlider(1, {
      name: this.formGroup.controls['name'].value,
      description: this.formGroup.controls['description'].value
    }, this.formGroup.controls['image'].value).subscribe(response => {
      if (response.errorCode == null) {
        console.log(response.result);
      } else {
        console.log('Error');
      }
    })
  }

  readURL(event: any): void {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      this.formGroup.controls['image'].setValue(file);
      
      const reader = new FileReader();
      reader.onload = (e) => {
        this.imageSrc = e.target?.result as string;
      };

      reader.readAsDataURL(file);
    }
  }
}

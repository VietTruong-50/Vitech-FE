import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SliderControllerService } from 'src/app/api-svc';

@Component({
  selector: 'app-cru-slider',
  templateUrl: './cru-slider.component.html',
  styleUrls: ['./cru-slider.component.scss']
})
export class CruSliderComponent implements OnInit {

  formGroup: FormGroup;
  imageSrc: string | ArrayBuffer = '';
  imageDomain = "../../../assets/image/sliders/";
  id: string | null = '';
  title: string | null = '';

  constructor(
    private formBuilder: FormBuilder,
    private sliderController: SliderControllerService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.title = this.route.snapshot.queryParamMap.get('type') + ' slider';

    this.formGroup = this.formBuilder.group({
      id: [],
      name: [],
      description: [],
      imageName: [],
      image: [],
    });


    if(this.route.snapshot.paramMap.get('id') != null){
      this.id = this.route.snapshot.paramMap.get('id');

      this.sliderController
        .getSliderById(Number(this.id))
        .subscribe((response) => {
          this.formGroup.patchValue({
            name: response.result?.name,
            description: response.result?.description,
            imageName: response.result?.imageName 
          })

          this.imageSrc = this.imageDomain + this.id + '/' + response.result?.imageName;
        });
    }
    
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
          this.router.navigate(['/admin', 'sliders']);
        } else {
          console.log('Error');
        }
      });
  }

  updateSlider() {
    this.sliderController
      .updateSlider(
        Number(this.id),
        {
          name: this.formGroup.controls['name'].value,
          description: this.formGroup.controls['description'].value,
        },
        this.formGroup.controls['image'].value
      )
      .subscribe((response) => {
        if (response.errorCode == null) {
          console.log(response.result);
          this.router.navigate(['/admin', 'sliders']);
        } else {
          console.log('Error');
        }
      });
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

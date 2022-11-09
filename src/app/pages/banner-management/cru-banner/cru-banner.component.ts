import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BannerControllerService } from 'src/app/api-svc';

@Component({
  selector: 'app-cru-banner',
  templateUrl: './cru-banner.component.html',
  styleUrls: ['./cru-banner.component.scss'],
})
export class CruBannerComponent implements OnInit {
  formGroup: FormGroup;
  imageSrc: string | ArrayBuffer = '';
  imageDomain = '../../../assets/image/banners/';
  id: string | null = '';
  title: string | null = '';

  constructor(
    private formBuilder: FormBuilder,
    private bannerController: BannerControllerService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.title = this.route.snapshot.queryParamMap.get('type');

    this.formGroup = this.formBuilder.group({
      id: [],
      name: [],
      content: [],
      imageName: [],
      image: [],
    });

    if (this.route.snapshot.paramMap.get('id') != null) {
      this.id = this.route.snapshot.paramMap.get('id');

      this.bannerController
        .getBannerById(Number(this.id))
        .subscribe((response) => {
          this.formGroup.patchValue({
            name: response.result?.name,
            content: response.result?.content,
            imageName: response.result?.imageName,
          });

          this.imageSrc =
            this.imageDomain + this.id + '/' + response.result?.imageName;
        });
    }
  }

  ngOnInit(): void {}

  createBanner() {
    console.log(this.formGroup.getRawValue());
    this.bannerController
      .createNewBanner(
        {
          name: this.formGroup.controls['name'].value,
          content: this.formGroup.controls['content'].value,
        },
        this.formGroup.controls['image'].value
      )
      .subscribe((response) => {
        if (response.errorCode == null) {
          console.log(response.result);
          this.router.navigate(['/admin', 'banners']);
        } else {
          console.log('Error');
        }
      });
  }

  updateBanner() {
    this.bannerController
      .updateBanner(
        Number(this.id),
        {
          name: this.formGroup.controls['name'].value,
          content: this.formGroup.controls['content'].value,
        },
        this.formGroup.controls['image'].value
      )
      .subscribe((response) => {
        if (response.errorCode == null) {
          console.log(response.result);
          this.router.navigate(['/admin', 'banners']);
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

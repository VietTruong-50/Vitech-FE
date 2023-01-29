import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import * as moment from 'moment';
import { AuthControllerService } from 'src/app/api-svc';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {
  userData: any;
  formGroup: FormGroup;

  gender: any[] = [
    { value: 'MALE', viewValue: 'Nam' },
    { value: 'FEMALE', viewValue: 'Nữ' },
    { value: 'OTHER', viewValue: 'Khác' },
  ];

  constructor(
    private authController: AuthControllerService,
    private formBuilder: FormBuilder
  ) {
    this.formGroup = this.formBuilder.group({
      fullName: [],
      email: [],
      phone: [],
      dateOfBirth: [],
      gender: [],
      address: [],
    });
  }

  ngOnInit(): void {
    this.getCurrentUser();
  }

  getCurrentUser() {
    this.authController.getCurrentUser().subscribe((rs) => {
      this.userData = rs.result;

      this.formGroup.patchValue({
        fullName: this.userData.result.fullName,
        email: this.userData.result.email,
        phone: this.userData.result.phone,
        dateOfBirth: moment(new Date(this.userData.result.dateOfBirth)).format(
          'yyyy-MM-DD'
        ),
        gender: this.userData.result.genderEnum,
        address: this.userData.result.address,
      });
    });
  }

  updateProfile() {
    console.log(this.formGroup.getRawValue());
    this.authController
      .updateProfile({
        fullName: this.formGroup.controls['fullName'].value,
        email: this.formGroup.controls['email'].value,
        phone: this.formGroup.controls['phone'].value,
        genderEnum: this.formGroup.controls['gender'].value,
        address: this.formGroup.controls['address'].value,
        dateOfBirth: moment(
          this.formGroup.controls['dateOfBirth'].value
        ).toISOString(),
      })
      .subscribe((rs) => {
        console.log(rs);
      });
  }
}

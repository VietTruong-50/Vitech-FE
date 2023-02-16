import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import * as moment from 'moment';
import {
  AuthControllerService,
  CustomerControllerService,
} from 'src/app/api-svc';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {
  userData: any;
  formGroup: FormGroup;
  addressFormGroup: FormGroup;

  gender: any[] = [
    { value: 'MALE', viewValue: 'Nam' },
    { value: 'FEMALE', viewValue: 'Nữ' },
    { value: 'OTHER', viewValue: 'Khác' },
  ];

  constructor(
    private authController: AuthControllerService,
    private formBuilder: FormBuilder,
    private customerController: CustomerControllerService
  ) {
    this.formGroup = this.formBuilder.group({
      fullName: [],
      email: [],
      phone: [],
      dateOfBirth: [],
      gender: [],
    });

    this.addressFormGroup = this.formBuilder.group({
      id: [],
      city: [],
      district: [],
      subDistrict: [],
      specificAddress: [],
    });
  }

  ngOnInit(): void {
    this.getCurrentUser();
    this.getDefaultAddress();
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
      });
    });
  }

  getDefaultAddress() {
    this.customerController.getDefaultAddress().subscribe((rs) => {
      this.addressFormGroup.patchValue({
        id: rs.result?.id,
        city: rs.result?.city,
        district: rs.result?.district,
        subDistrict: rs.result?.subDistrict,
        specificAddress: rs.result?.specificAddress,
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
        dateOfBirth: moment(
          this.formGroup.controls['dateOfBirth'].value
        ).toISOString(),
      })
      .subscribe((rs) => {
        console.log(rs);
      });
    this.updateAddress();
  }

  updateAddress() {
    let formValue = this.addressFormGroup.getRawValue();
    console.log(formValue);

    this.customerController
      .editAddress(formValue.id, {
        city: formValue.city,
        district: formValue.district,
        subDistrict: formValue.subDistrict,
        levant: true,
        specificAddress: formValue.specificAddress,
      })
      .subscribe((rs) => {
        this.getDefaultAddress();
      });
  }
}

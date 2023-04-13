import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import {
  AuthControllerService,
  CustomerControllerService,
} from 'src/app/api-svc';
import { CreateAddressDialogComponent } from '../address-note-page/create-address-dialog/create-address-dialog.component';

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
    private customerController: CustomerControllerService,
    private dialog: MatDialog,
    private toastrService: ToastrService
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
      receiverName: [],
      phone: [],
      email: [],
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
        receiverName: rs.result?.receiverName,
        phone: rs.result?.phone,
        email: rs.result?.email,
        city: rs.result?.city,
        district: rs.result?.district,
        subDistrict: rs.result?.subDistrict,
        specificAddress: rs.result?.specificAddress,
        isDefault: rs.result?.default,
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
        if (rs.errorCode == null) {
          this.toastrService.success('Cập nhật thông tin thành công');
        }
      });
    this.updateAddress();
  }

  updateAddress() {
    let formValue = this.addressFormGroup.getRawValue();
    console.log(formValue);

    this.customerController
      .editAddress(formValue.id, {
        receiverName: formValue.receiverName,
        phone: formValue.phone,
        email: formValue.email,
        city: formValue.city,
        levant: true,
        specificAddress: formValue.specificAddress,
        district: formValue.district,
        subDistrict: formValue.subDistrict,
      })
      .subscribe((rs) => {
        this.getDefaultAddress();
      });
  }

  openDialog(id?: number) {
    this.dialog
      .open(CreateAddressDialogComponent, {
        width: '40vw',
        data: {
          id: id,
          isDefault: true,
        },
      })
      .afterClosed()
      .subscribe((rs) => {
        this.getDefaultAddress();
      });
  }
}

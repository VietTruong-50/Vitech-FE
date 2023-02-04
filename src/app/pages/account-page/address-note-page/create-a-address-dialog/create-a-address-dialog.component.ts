import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CustomerControllerService } from 'src/app/api-svc';

@Component({
  selector: 'app-create-a-address-dialog',
  templateUrl: './create-a-address-dialog.component.html',
  styleUrls: ['./create-a-address-dialog.component.scss'],
})
export class CreateAAddressDialogComponent implements OnInit {
  formGroup: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private customerController: CustomerControllerService,
    public dialogRef: MatDialogRef<CreateAAddressDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.formGroup = this.formBuilder.group({
      city: [],
      district: [],
      subDistrict: [],
      specificAddress: [],
      isDefault: false,
    });

    if (data.id != null) {
      this.customerController.getAddressById(data.id).subscribe((rs) => {
        console.log(rs.result?.default);
        
        this.formGroup.patchValue({
          city: rs.result?.city,
          district: rs.result?.district,
          subDistrict: rs.result?.subDistrict,
          specificAddress: rs.result?.specificAddress,
          isDefault: rs.result?.default,
        });
      });
    }
  }

  ngOnInit(): void {}

  createNewAddress() {
    let formValue = this.formGroup.getRawValue();
    console.log(formValue);

    this.customerController
      .createNewAddress({
        city: formValue.city,
        levant: formValue.isDefault,
        specificAddress: formValue.specificAddress,
        district: formValue.district,
        subDistrict: formValue.subDistrict,
      })
      .subscribe((rs) => {
        console.log(rs);
        this.dialogRef.close();
      });
  }

  editAddress() {
    let formValue = this.formGroup.getRawValue();

    this.customerController
      .editAddress(this.data.id, {
        city: formValue.city,
        levant: formValue.isDefault,
        specificAddress: formValue.specificAddress,
        district: formValue.district,
        subDistrict: formValue.subDistrict,
      })
      .subscribe((rs) => {
        console.log(rs);
        this.dialogRef.close();
      });
  }
}

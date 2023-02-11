import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { CustomerControllerService } from 'src/app/api-svc';

@Component({
  selector: 'app-cru-customer',
  templateUrl: './cru-customer.component.html',
  styleUrls: ['./cru-customer.component.scss'],
})
export class CruCustomerComponent implements OnInit {
  title: string = '';
  id: string | null = '';
  customerData: any;
  formGroup: FormGroup;
  formGroup2: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private customerController: CustomerControllerService,
    private formBuilder: FormBuilder
  ) {
    this.title = this.route.snapshot.queryParamMap.get('type') + ' customer';

    if (route.snapshot.paramMap.get('id') != null) {
      this.id = route.snapshot.paramMap.get('id');
      this.getCustomerData(Number(this.id));
    }

    this.formGroup = this.formBuilder.group({
      id: [],
      fullName: [],
      email: [],
      phone: [],
      genderEnum: [],
      dateOfBirth: [],
    });

    this.formGroup2 = this.formBuilder.group({
      id: [],
      city: [],
      district: [],
      subDistrict: [],
      specificAddress: [],
      default: false,
    });
  }
  ngOnInit(): void {}

  getCustomerData(id: number) {
    this.customerController.getCustomerById(id).subscribe((rs) => {
      this.customerData = rs.result?.customer;
      console.log(this.customerData);

      this.formGroup.patchValue(this.customerData);

      let defaultAddress = rs.result?.addresses?.find(
        (item) => item.default == true
      );
      console.log(defaultAddress);

      this.formGroup2.patchValue(defaultAddress!);
    });
  }

  updateCustomer() {
    console.log(this.formGroup.getRawValue());
    console.log(this.formGroup2.getRawValue());

    this.customerController
      .editCustomer(this.formGroup.controls['id'].value, {
        email: this.formGroup.controls['email'].value,
        phone: this.formGroup.controls['phone'].value,
        genderEnum: this.formGroup.controls['genderEnum'].value,
        dateOfBirth: moment(
          this.formGroup.controls['dateOfBirth'].value
        ).toISOString(),
        fullName: this.formGroup.controls['fullName'].value,
        addressId: this.formGroup2.controls['id'].value,
        addressRequest: {
          city: this.formGroup2.controls['city'].value,
          district: this.formGroup2.controls['district'].value,
          specificAddress: this.formGroup2.controls['specificAddress'].value,
          subDistrict: this.formGroup2.controls['subDistrict'].value,
        },
      })
      .subscribe((rs) => {this.getCustomerData(Number(this.id))});
  }
}

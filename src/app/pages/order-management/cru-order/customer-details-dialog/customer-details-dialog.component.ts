import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as moment from 'moment';

@Component({
  selector: 'app-customer-details-dialog',
  templateUrl: './customer-details-dialog.component.html',
  styleUrls: ['./customer-details-dialog.component.scss'],
})
export class CustomerDetailsDialogComponent implements OnInit {
  formGroup: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.formGroup = this.formBuilder.group({
      fullName: [],
      phone: [],
      dateOfBirth: [],
      email: [],
    });

    this.formGroup.patchValue({
      fullName: data.customer.fullName,
      email: data.customer.email,
      phone: data.customer.phone,
      dateOfBirth: data.customer.dateOfBirth,
    });
  }

  ngOnInit(): void {}
}

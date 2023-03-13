import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {
  AuthControllerService,
  CustomerControllerService,
} from 'src/app/api-svc';
import { CreateAddressDialogComponent } from './create-address-dialog/create-address-dialog.component';

@Component({
  selector: 'app-address-note-page',
  templateUrl: './address-note-page.component.html',
  styleUrls: ['./address-note-page.component.scss'],
})
export class AddressNotePageComponent implements OnInit {
  userData: any;
  constructor(
    private customerController: CustomerControllerService,
    private authController: AuthControllerService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getAddressData();
    this.getDefaultAddress();
    this.getCurrentUser();
  }

  getCurrentUser() {
    this.authController.getCurrentUser().subscribe((rs) => {
      this.userData = rs.result;
      this.userData = this.userData.result;
    });
  }

  addressData: any;

  defaultAddress: any;

  getAddressData() {
    this.customerController.getAllAddress().subscribe((rs) => {
      this.addressData = rs.result;
    });
  }

  getDefaultAddress() {
    this.customerController.getDefaultAddress().subscribe((rs) => {
      this.defaultAddress = rs.result;
    });
  }

  openDialog(id?: number) {
    this.dialog
      .open(CreateAddressDialogComponent, {
        width: '40vw',
        data: {
          id: id
        },
      })
      .afterClosed()
      .subscribe((rs) => {
        this.getAddressData();
        this.getDefaultAddress();
      });
  }

  deleteAddress(id: number) {
    this.customerController.deleteAddress(id).subscribe((rs) => {
      this.getAddressData();
        this.getDefaultAddress();
    });
  }
}
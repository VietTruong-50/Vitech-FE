import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-order-details-dialog',
  templateUrl: './order-details-dialog.component.html',
  styleUrls: ['./order-details-dialog.component.scss'],
})
export class OrderDetailsDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<OrderDetailsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private sanitizer: DomSanitizer
  ) {

    data.orderDetails.forEach((element: any) => {
      if (element.product.featureImageByte) {
        let objectURL = 'data:image/jpeg;base64,' + element.product.featureImageByte;

        element.product.imgUrl = this.sanitizer.bypassSecurityTrustUrl(objectURL);
      }
    });
  }

  ngOnInit(): void {}
}

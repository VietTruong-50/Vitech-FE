import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { CustomerControllerService } from 'src/app/api-svc';
import { CreateAAddressDialogComponent } from '../address-note-page/create-a-address-dialog/create-a-address-dialog.component';

@Component({
  selector: 'app-notification-page',
  templateUrl: './notification-page.component.html',
  styleUrls: ['./notification-page.component.scss'],
})
export class NotificationPageComponent implements OnInit {
  constructor(
    private customerController: CustomerControllerService,
    private router: Router,
    private sanitizer: DomSanitizer,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getAllNotificationsData();
  }

  notificationsData: any;

  getAllNotificationsData() {
    this.customerController.getAllNotifications().subscribe((rs) => {
      this.notificationsData = rs.result;

      let objectURL =
        'data:image/jpeg;base64,' +
        this.notificationsData[0].order.orderDetails[0].product
          .featureImageByte;

      this.notificationsData[0].order.orderDetails[0].product.imgUrl =
        this.sanitizer.bypassSecurityTrustUrl(objectURL);
    });
  }

  renderTo(code: string) {
    this.router.navigate(['account/order', code]);
  }

  
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerControllerService } from 'src/app/api-svc';

@Component({
  selector: 'app-notification-page',
  templateUrl: './notification-page.component.html',
  styleUrls: ['./notification-page.component.scss'],
})
export class NotificationPageComponent implements OnInit {
  constructor(private customerController: CustomerControllerService, private router: Router) {}

  ngOnInit(): void {
    this.getAllNotificationsData();
  }

  notificationsData: any;

  getAllNotificationsData() {
    this.customerController.getAllNotifications().subscribe((rs) => {
      this.notificationsData = rs.result;
    });
  }

  renderTo(code: string){
    this.router.navigate(['account/order', code])
  }
}

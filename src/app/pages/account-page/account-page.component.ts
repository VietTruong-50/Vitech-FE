import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { AuthControllerService } from 'src/app/api-svc';

@Component({
  selector: 'app-account-page',
  templateUrl: './account-page.component.html',
  styleUrls: ['./account-page.component.scss'],
})
export class AccountPageComponent implements OnInit {
  @ViewChild('sidenav') sidenav!: MatSidenav;
  showSubmenu: boolean = false;
  isExpanded = true;
  isShowing = false;
  showSubSubMenu: boolean = false;
  userData: any;

  constructor(private authController: AuthControllerService) {}

  ngOnInit(): void {
    this.getCurrentUser();
  }

  getCurrentUser() {
    this.authController.getCurrentUser().subscribe((rs) => {
      this.userData = rs.result;
    });
  }
}

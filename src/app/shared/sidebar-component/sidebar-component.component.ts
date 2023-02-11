import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthControllerService, UserControllerService } from 'src/app/api-svc';

@Component({
  selector: 'app-sidebar-component',
  templateUrl: './sidebar-component.component.html',
  styleUrls: ['./sidebar-component.component.scss'],
})
export class SidebarComponentComponent implements OnInit {
  userData: any;
  selectedIndex: number = 0
  constructor(
    private cookieService: CookieService,
    private router: Router,
    private authController: AuthControllerService
  ) {}

  ngOnInit(): void {
    this.getUserData();
  }

  logOut() {
    this.cookieService.delete('authToken');
    this.router.navigateByUrl('/admin/login').then(() => {
      window.location.reload();
    });
  }

  getUserData() {
    this.authController.getCurrentUser().subscribe((rs) => {
      this.userData = rs.result;

      this.userData = this.userData.result
    });
  }

  setIndex(index: number) {
    this.selectedIndex = index;
  }
}

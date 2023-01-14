import { Component, OnInit } from '@angular/core';
import { AuthControllerService, UserControllerService } from 'src/app/api-svc';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  userData: any;

  constructor(private authController: AuthControllerService) { }

  ngOnInit(): void {
    this.getCurrentUser()
  }

  getCurrentUser(){
    this.authController.getCurrentUser().subscribe(rs => {
      this.userData = rs.result
      console.log(this.userData);
      
    })
  }
}

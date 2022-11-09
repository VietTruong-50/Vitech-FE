import { Component, OnInit } from '@angular/core';
import { UserControllerService } from 'src/app/api-svc';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss'],
})
export class UserManagementComponent implements OnInit {
  title: string = 'List user';
  userData: any
  constructor(private userController: UserControllerService) {}

  ngOnInit(): void {
    this.getData()
  }

  getData(){
    this.userController.getAllUsers(5, 0 , 'createdAt').subscribe(response => {
      this.userData = response.result?.content
    })
  }
}

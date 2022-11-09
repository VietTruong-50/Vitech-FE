import { Component, OnInit } from '@angular/core';
import { RoleControllerService } from 'src/app/api-svc';

@Component({
  selector: 'app-role-management',
  templateUrl: './role-management.component.html',
  styleUrls: ['./role-management.component.scss'],
})
export class RoleManagementComponent implements OnInit {
  title: string = 'List roles';
  constructor(private roleController: RoleControllerService) {}

  ngOnInit(): void {
    this.getData();
  }

  roleData: any;

  getData() {
    this.roleController.getAllRoles(5, 0, 'id').subscribe((response) => {
      this.roleData = response.result?.content;
    });
  }
}

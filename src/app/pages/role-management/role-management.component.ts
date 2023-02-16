import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Role, RoleControllerService } from 'src/app/api-svc';

@Component({
  selector: 'app-role-management',
  templateUrl: './role-management.component.html',
  styleUrls: ['./role-management.component.scss'],
})
export class RoleManagementComponent implements OnInit {
  title: string = 'List roles';

  pageIndex: number = 0;
  pageSize: number = 5;

  displayedColumns: string[] = ['position', 'name', 'description', 'action'];
  dataSource: MatTableDataSource<any> = new MatTableDataSource();

  constructor(private roleController: RoleControllerService) {}

  ngOnInit(): void {
    this.getData();
  }

  roleData: any;

  getData() {
    this.roleController.getAllRoles(5, 0, 'id').subscribe((response) => {
      this.dataSource = new MatTableDataSource<Role>(response.result?.content);
    });
  }
}

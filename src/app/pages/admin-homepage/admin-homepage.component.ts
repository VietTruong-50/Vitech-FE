import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { UserControllerService } from 'src/app/api-svc';

@Component({
  selector: 'app-admin-homepage',
  templateUrl: './admin-homepage.component.html',
  styleUrls: ['./admin-homepage.component.scss'],
})
export class AdminHomepageComponent implements OnInit {
  statisticData: any;

  constructor(private userController: UserControllerService) {}

  ngOnInit(): void {
    // Line chart:

    this.getData();
  }

  getData() {
    this.userController.getStatistic().subscribe((rs) => {
      this.statisticData = rs.result;
    });
  }
}

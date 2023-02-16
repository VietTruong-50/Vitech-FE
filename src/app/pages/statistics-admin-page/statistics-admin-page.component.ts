import { Component, OnInit, ViewChild } from '@angular/core';
import { UserControllerService } from 'src/app/api-svc';
import { Chart, registerables } from 'chart.js';

@Component({
  selector: 'app-statistics-admin-page',
  templateUrl: './statistics-admin-page.component.html',
  styleUrls: ['./statistics-admin-page.component.scss'],
})
export class StatisticsAdminPageComponent implements OnInit {
  statisticData: any;

  constructor(private userController: UserControllerService) {}

  ngOnInit(): void {
    this.getSaleSatistic();

    Chart.register(...registerables);
    // Line chart:

    this.getData();
  }

  getData() {
    this.userController.getStatistic().subscribe((rs) => {
      this.statisticData = rs.result;
    });
  }

  saleSatistic: number[] = [];

  getSaleSatistic() {
    this.userController.getValuesByMonth().subscribe((rs) => {
      this.saleSatistic = rs.result!.saleStatistic!.map(function (item) {
        return item == null ? 0 : item;
      });

      new Chart('lineChart', {
        type: 'line',
        data: {
          labels: [
            'Tháng 1',
            'Tháng 2',
            'Tháng 3',
            'Tháng 4',
            'Tháng 5',
            'Tháng 6',
            'Tháng 7',
            'Tháng 8',
            'Tháng 9',
            'Tháng 10',
            'Tháng 11',
            'Tháng 12',
          ],
          datasets: [
            {
              label: 'Doanh thu tháng',
              data: this.saleSatistic,
              fill: false,
              borderColor: 'red',
              borderWidth: 1,
            },
          ],
        },
      });

      new Chart('pieChart', {
        type: 'pie',
        data: {
          labels: ['Chờ xử lý', 'Chờ giao hàng', 'Đã hoàn thành', 'Đã huỷ'],
          datasets: [
            {
              label: 'Đơn',
              data: rs.result!.orderStatistic,
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
              ],
              borderColor: [
                'rgba(255,99,132,1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
              ],
              borderWidth: 1,
            },
          ],
        },
      });
    });
  }
}

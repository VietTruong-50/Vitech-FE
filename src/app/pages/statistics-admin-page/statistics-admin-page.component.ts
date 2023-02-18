import { Component, OnInit, ViewChild } from '@angular/core';
import {
  CountOrderResponse,
  CustomerControllerService,
  Order,
  ProductControllerService,
  UserControllerService,
} from 'src/app/api-svc';
import { Chart, registerables } from 'chart.js';
import { MatTableDataSource } from '@angular/material/table';
import * as moment from 'moment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-statistics-admin-page',
  templateUrl: './statistics-admin-page.component.html',
  styleUrls: ['./statistics-admin-page.component.scss'],
})
export class StatisticsAdminPageComponent implements OnInit {
  title: string = 'Statistic';
  selected: { startDate: moment.Moment; endDate: moment.Moment } | undefined;
  pageIndex: number = 0;
  pageSize: number = 5;

  status = [
    {
      value: 'ALL',
      viewValue: 'Tất cả',
    },
    {
      value: 'WAITING_PROCESS',
      viewValue: 'Chờ xử lý',
    },
    {
      value: 'WAITING_DELIVERY',
      viewValue: 'Chờ giao hàng',
    },
    {
      value: 'SUCCESS',
      viewValue: 'Đã hoàn thành',
    },
    {
      value: 'CANCEL',
      viewValue: 'Đã huỷ',
    },
  ];

  displayedColumns: string[] = [
    'position',
    'orderCode',
    'invoiceNumber',
    'status',
    'orderDate',
    'total',
    'action',
  ];

  dataSource: MatTableDataSource<Order> = new MatTableDataSource();

  constructor(
    private userController: UserControllerService,
    private customerController: CustomerControllerService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getStatisticCountOrder();
    this.getSaleSatistic();

    this.getSuccessOrderData();
    Chart.register(...registerables);
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
              label: 'Doanh thu theo tháng',
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

  total: number = 0;

  getSuccessOrderData() {
    this.userController
      .statisticSuccessOrderAndOrderDateBetween(
        this.selected?.startDate != null
          ? this.selected?.startDate.toISOString()
          : '2023-01-01T00:00:00.000Z',
        this.selected?.endDate != null
          ? this.selected?.endDate.toISOString()
          : '2023-12-31T00:00:00.000Z',
        0,
        20
      )
      .subscribe((rs) => {
        this.total = 0;

        rs.result?.content?.forEach((item) => {
          this.total += item.total!;
        });

        this.dataSource = new MatTableDataSource<Order>(rs.result?.content);
      });
  }

  statisticCountOrderData: any[] = [];
  totalMoney = 0;

  getStatisticCountOrder() {
    this.userController.statisticCountOrder().subscribe((rs) => {
      let total = 0;
      let quantity = 0;
      this.totalMoney = 0;

      rs.result?.forEach((item) => {
        total += item.totalAll!;

        quantity += item.quantity!;

        if (item.status == 'CANCEL') {
          this.totalMoney -= item.totalAll!;
        } else if (item.status == 'SUCCESS') {
          this.totalMoney += item.totalAll!;
        }

        this.statisticCountOrderData.push(item);
      });
      this.statisticCountOrderData.push({
        status: 'ALL',
        quantity: quantity,
        totalAll: total,
      });
    });
  }

  renderTo(type: string, id?: number) {
    this.router.navigate(['/admin/orders', id], {
      queryParams: { type: type },
    });
  }

  onPaginate(event: any) {}
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import {
  CustomerControllerService,
  UserControllerService,
} from 'src/app/api-svc';
import { CustomerDetailsDialogComponent } from './customer-details-dialog/customer-details-dialog.component';
import { OrderDetailsDialogComponent } from './order-details-dialog/order-details-dialog.component';

@Component({
  selector: 'app-cru-order',
  templateUrl: './cru-order.component.html',
  styleUrls: ['./cru-order.component.scss'],
})
export class CruOrderComponent implements OnInit {
  orderDetail: any;
  title: string = '';
  isDisabled: any;

  formGroup: FormGroup;
  formGroup2: FormGroup;
  formGroup3: FormGroup;

  status = [
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

  paymentMethod = [
    {
      value: 'ONLINE_PAYING',
      viewValue: 'Thanh toán trực tuyến',
    },
    {
      value: 'DELIVERY_PAYING',
      viewValue: 'Thanh toán khi nhận hàng',
    },
  ];

  shipping = [
    {
      value: 2,
      viewValue: 'Thường',
    },
    {
      value: 1,
      viewValue: 'Hoả tốc',
    },
  ];

  constructor(
    private route: ActivatedRoute,
    private customerController: CustomerControllerService,
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private userController: UserControllerService
  ) {
    this.formGroup = this.formBuilder.group({
      orderCode: [],
      fullName: [],
      orderDate: [],
      status: [],
      deliveryDate: [],
    });
    this.formGroup2 = this.formBuilder.group({
      cardNumber: [],
      cardOwner: [],
      month: [],
      year: [],
      paymentMethod: [],
    });
    this.formGroup3 = this.formBuilder.group({
      fullName: [],
      phone: [],
      email: [],
      city: [],
      district: [],
      subDistrict: [],
      specificAddress: [],
      shippingMethod: [],
    });

    if (this.route.snapshot.queryParamMap.get('type')! == 'Info') {
      this.title = 'Thông tin đơn hàng';
      this.isDisabled = true;
    } else if (this.route.snapshot.queryParamMap.get('type')! == 'Edit') {
      this.title = 'Sửa đơn hàng';
      this.isDisabled = null;
    }
  }

  ngOnInit(): void {
    if (this.route.snapshot.paramMap.get('orderCode')) {
      this.getOrderDetail();
    }
  }
  orderCode: string = '';

  getOrderDetail() {
    this.orderCode = this.route.snapshot.paramMap.get('orderCode')!;
    this.customerController.getOrderByCode(this.orderCode).subscribe((rs) => {
      this.orderDetail = rs.result;

      console.log(this.orderDetail);

      this.formGroup.patchValue({
        fullName: this.orderDetail.customer.fullName,
        orderCode: this.orderDetail.orderCode,
        orderDate: moment(new Date(this.orderDetail.orderDate)).format(
          'YYYY-MM-DDTHH:mm'
        ),
        status: this.orderDetail.status,
        deliveryDate: this.orderDetail.deliveryDate,
      });

      this.formGroup2.patchValue({
        cardNumber: this.orderDetail.cardPayment.cardNumber,
        cardOwner: this.orderDetail.cardPayment.cardOwner,
        month: this.orderDetail.cardPayment.month,
        year: this.orderDetail.cardPayment.year,
        paymentMethod: this.orderDetail.paymentMethodEnum,
      });

      this.formGroup3.patchValue({
        fullName: this.orderDetail.address.receiverName,
        phone: this.orderDetail.address.phone,
        email: this.orderDetail.address.email,
        city: this.orderDetail.address.city,
        district: this.orderDetail.address.district,
        subDistrict: this.orderDetail.address.subDistrict,
        specificAddress: this.orderDetail.address.specificAddress,
        shippingMethod: this.orderDetail.shippingMethod.shippingMethod,
      });
    });
  }

  openDialog(component: string) {
    if (component == 'orderDetails') {
      this.dialog.open(OrderDetailsDialogComponent, {
        width: '35vw',
        data: {
          orderDetails: this.orderDetail.orderDetails,
          shippingPrice: this.orderDetail.shippingMethod.price,
          total: this.orderDetail.total,
        },
      });
    } else {
      this.dialog.open(CustomerDetailsDialogComponent, {
        width: '35vw',
        data: {
          customer: this.orderDetail.customer,
        },
      });
    }
  }

  changeOrderStatus() {
    console.log(this.formGroup.getRawValue());

    this.userController
      .changeOrderStatus(
        this.orderDetail.id,
        this.formGroup.controls['status'].value
      )
      .subscribe((rs) => {
        this.getOrderDetail();
      });
  }

  onChange(event: any) {}

  onChangeStatus(event: any) {
    this.formGroup.controls['status'].setValue(event.target.value);
  }

  editOrder() {
    this.userController
      .updateOrder(this.orderDetail.id, {
        orderStatusEnum: this.formGroup.controls['status'].value,
        addressId: this.orderDetail.address.id,
        city: this.formGroup3.controls['city'].value,
        district: this.formGroup3.controls['district'].value,
        subDistrict: this.formGroup3.controls['subDistrict'].value,
        specificAddress: this.formGroup3.controls['specificAddress'].value,
        deliveryDate: moment(
          this.formGroup.controls['deliveryDate'].value
        ).toISOString(),
        receiverName: this.formGroup3.controls['receiverName'].value,
        phone: this.formGroup3.controls['phone'].value,
        email: this.formGroup3.controls['email'].value,
      })
      .subscribe((rs) => {
        this.getOrderDetail();
      });
  }
}

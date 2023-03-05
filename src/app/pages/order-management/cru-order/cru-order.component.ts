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
import { InventoryCheckDialogComponent } from './inventory-check-dialog/inventory-check-dialog.component';
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
  isInvoice: boolean = false;
  formGroup: FormGroup;
  formGroup2: FormGroup;
  formGroup3: FormGroup;
  formGroup4: FormGroup;

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
      receiverName: [],
      phone: [],
      email: [],
      city: [],
      district: [],
      subDistrict: [],
      specificAddress: [],
      shippingMethod: [],
    });

    this.formGroup4 = this.formBuilder.group({
      invoiceSymbol: [],
      taxAuthoritiesCode: [],
      taxNumber: [],
    });

    switch (this.route.snapshot.queryParamMap.get('type')) {
      case 'Info': {
        this.title = 'Thông tin đơn hàng';
        this.isInvoice = false;
        this.isDisabled = true;
        break;
      }
      case 'Edit': {
        this.title = 'Sửa đơn hàng';
        this.isDisabled = null;
        this.isInvoice = false;
        break;
      }
      case 'Invoice': {
        this.title = 'Hoá đơn';
        this.isDisabled = true;
        this.isInvoice = true;
        break;
      }
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
        receiverName: this.orderDetail.address.receiverName,
        phone: this.orderDetail.address.phone,
        email: this.orderDetail.address.email,
        city: this.orderDetail.address.city,
        district: this.orderDetail.address.district,
        subDistrict: this.orderDetail.address.subDistrict,
        specificAddress: this.orderDetail.address.specificAddress,
        shippingMethod: this.orderDetail.shippingMethod.shippingMethod,
      });

      this.formGroup4.patchValue({
        invoiceSymbol: this.orderDetail.invoiceSymbol,
        taxAuthoritiesCode: this.orderDetail.taxAuthoritiesCode,
        taxNumber: this.orderDetail.taxNumber,
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
    } else if (component == 'customer') {
      this.dialog.open(CustomerDetailsDialogComponent, {
        width: '35vw',
        data: {
          customer: this.orderDetail.customer,
        },
      });
    } else {
      this.dialog.open(InventoryCheckDialogComponent, {
        width: '65vw',
      });
    }
  }

  changeOrderStatus(status?: string) {
    console.log(this.formGroup.getRawValue());

    this.userController
      .changeOrderStatus(
        this.orderDetail.id,
        status ? status : this.formGroup.controls['status'].value
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

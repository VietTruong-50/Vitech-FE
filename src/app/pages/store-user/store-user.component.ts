import { LabelType, Options } from '@angular-slider/ngx-slider';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-store-user',
  templateUrl: './store-user.component.html',
  styleUrls: ['./store-user.component.scss']
})
export class StoreUserComponent implements OnInit {
  minValue: number = 0;
  maxValue: number = 100000000;
  options: Options = {
    floor: 0,
    ceil: 100000000,
    step: 1000000,
    translate: (value: number, label: LabelType): string => {
      return value.toLocaleString('en') + ' VND';
    }
  };
  constructor() { }

  ngOnInit(): void {
  }

}

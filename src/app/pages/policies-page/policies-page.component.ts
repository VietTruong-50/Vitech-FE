import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-policies-page',
  templateUrl: './policies-page.component.html',
  styleUrls: ['./policies-page.component.scss'],
})
export class PoliciesPageComponent implements OnInit {
  selectedIndex: number = 0;
  constructor() {}

  ngOnInit(): void {}

  setIndex(index: number) {
    this.selectedIndex = index;
  }
}

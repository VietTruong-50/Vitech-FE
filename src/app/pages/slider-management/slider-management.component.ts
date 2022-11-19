import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { SliderControllerService } from 'src/app/api-svc';

@Component({
  selector: 'app-slider-management',
  templateUrl: './slider-management.component.html',
  styleUrls: ['./slider-management.component.scss'],
})
export class SliderManagementComponent implements OnInit {
  title: string = 'List slider';
  sliderData: any;
  pageIndex!: number;
  pageSize: number = 5;
  pageSizeOptions: number[] = [5, 10, 25, 100];

  constructor(
    private sliderController: SliderControllerService,
    private router: Router,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getData();
  }

  getData(pageIndex?: number) {
    this.sliderController
      .getAllSlider(this.pageSize, pageIndex ? pageIndex : 0, 'name')
      .subscribe((res) => {
        this.sliderData = res.result?.content;
      });
  }

  deleteSlider(id: number) {
    this.sliderController.deleteSlider(id).subscribe((response) => {
      if (response.errorCode == null) {
        window.alert('Delete successfully');
        this.getData();
      }
    });
  }

  renderTo(type: string, id?: number) {
    if (type == 'Add') {
      this.router.navigate(['/admin/sliders', 'add-slider'], {
        queryParams: { type: type },
      });
    } else if ((type = 'Edit')) {
      this.router.navigate(['/admin/sliders', 'edit-slider', id], {
        queryParams: { type: type },
      });
    }
  }

  onPaginate($event: PageEvent) {
    this.updateUrlPath($event.pageIndex, $event.pageSize);
  }

  updateUrlPath(pageIndex: number, pageSize: number) {
    this.pageIndex = pageIndex;
    this.pageSize = pageSize;
    const pureUrl = this.router.url.split('?').shift();
    this.location.go(`${pureUrl}?pageIndex=${pageIndex}&pageSize=${pageSize}`);
    this.getData(this.pageIndex);
  }
}

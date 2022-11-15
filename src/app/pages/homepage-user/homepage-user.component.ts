import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-homepage-user',
  templateUrl: './homepage-user.component.html',
  styleUrls: ['./homepage-user.component.scss'],
})
export class HomepageUserComponent implements OnInit {
  slides = [
    { img: '../../../assets/image/product01.png' },
    { img: '../../../assets/image/product02.png' },
    { img: '../../../assets/image/product03.png' },
    { img: '../../../assets/image/product01.png' },
    { img: '../../../assets/image/product02.png' },
  ];

  slideConfig = {
    "slidesToShow": 3,
    "slidesToScroll": 1,
    "dots": true,
    "infinite": true,
    "autoplay": true,
    "autoplaySpeed": 1500
  };

  slickInit(e: any) {
    console.log('slick initialized');
  }
  breakpoint(e: any) {
    console.log('breakpoint');
  }
  afterChange(e: any) {
    console.log('afterChange');
  }
  beforeChange(e: any) {
    console.log('beforeChange');
  }
  constructor() {}
  ngOnInit(): void {}
}

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-detail-user',
  templateUrl: './product-detail-user.component.html',
  styleUrls: ['./product-detail-user.component.scss']
})
export class ProductDetailUserComponent implements OnInit {

  nameProduct: string = "Laptop 1";

  mainImgSrc: string = '../../../assets/image/product01.png';

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
    "vertical": true,
    "infinite": true,
    "verticalSwiping": true,
    "arrows": false,
    "adaptiveHeight": true
  };

  constructor() { }

  ngOnInit(): void {
  }

  setMainImg(imgSrc: string){
    this.mainImgSrc = imgSrc;
  }
}

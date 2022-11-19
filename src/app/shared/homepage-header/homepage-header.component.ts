import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-homepage-header',
  templateUrl: './homepage-header.component.html',
  styleUrls: ['./homepage-header.component.scss'],
})
export class HomepageHeaderComponent implements OnInit {
  isShowCart: boolean = false;

  currentRoute: string;

  constructor(private router: Router) {
    this.currentRoute = this.router.url;
  }

  ngOnInit(): void {}

  showCart() {
    this.isShowCart = !this.isShowCart;
  }

  renderTo(url: string) {
    this.router.navigate([url]);
  }
}

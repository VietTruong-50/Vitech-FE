import { Component } from '@angular/core';
import { Router, RouterEvent, RoutesRecognized } from '@angular/router';
import { filter, pairwise } from 'rxjs';
import { CartService } from 'src/app/service/cart.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'admin-vitech';

  constructor(){

  }
}

import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-account',
  templateUrl: './user-account.component.html',
  styleUrls: ['./user-account.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush 
})
export class UserAccountComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}

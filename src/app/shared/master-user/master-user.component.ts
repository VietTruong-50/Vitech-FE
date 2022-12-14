import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-master-user',
  templateUrl: './master-user.component.html',
  styleUrls: ['./master-user.component.scss']
})
export class MasterUserComponent implements OnInit {

  constructor(private router: Router) { 
    // this.router.navigate(['homepage'])

  }

  ngOnInit(): void {
  }

}

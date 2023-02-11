import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss'],
})
export class AdminLoginComponent implements OnInit {

  formGroup: FormGroup

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder
  ) {
    this.formGroup = this.formBuilder.group({
      username: [],
      password: [],
    });
  }

  ngOnInit(): void {}

  login() {
    let data = this.formGroup.getRawValue()
    this.authService.login(data.username, data.password)
  }
}

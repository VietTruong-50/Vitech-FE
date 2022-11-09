import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ApiResponseJwtResponse, AuthControllerService, JwtResponse } from 'src/app/api-svc';
import { AuthService } from 'src/app/service/auth.service';
import { GlobalConstants } from 'src/app/shared/GlobalConstants';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit {
  formGroup: FormGroup;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private cookieService: CookieService,
    private router: Router
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

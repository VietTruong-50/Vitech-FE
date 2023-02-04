import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { CookieService } from 'ngx-cookie-service';
import { AuthControllerService, JwtResponse } from '../api-svc';
import { GlobalConstants } from '../shared/GlobalConstants';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private authService: AuthControllerService,
    private cookieService: CookieService,
    private router: Router
  ) {
    localStorage.setItem('roles', '');
  }

  user!: JwtResponse;

  login(username: string, password: string) {
    this.authService
      .authenticateUser({
        username: username,
        password: password,
      })
      .subscribe((response) => {
        // console.log(response.result);

        if (response.errorCode == null) {
          this.cookieService.set(
            GlobalConstants.authToken,
            <string>response.result?.jwtToken,
            undefined,
            '/'
          );
          this.user = response?.result as JwtResponse;
          localStorage.setItem(
            'roles',
            JSON.stringify(response?.result?.roles)
          );
          if (
            response.result?.roles?.includes('ROLE_ADMIN') ||
            response.result?.roles?.includes('ROLE_MOD')
          ) {
            this.router.navigate(['admin']);
            location.href = '/admin';
          } else {
            this.router.navigate(['homepage']).then(() => {
              window.location.reload();
            });
          }
        }
      });
  }

  signUp(userRequest: any) {
    console.log(userRequest);

    this.authService
      .register({
        userName: userRequest.username,
        password: userRequest.password,
        customer: true,
        email: userRequest.email,
        dateOfBirth: moment(userRequest.dateOfBirth).toISOString(),
        fullName: userRequest.fullName,
        genderEnum: userRequest.gender,
        phone: userRequest.phone,
      })
      .subscribe((rs) => {
        console.log(rs);
        if (String(rs.message) == 'Error: Email is already taken!') {
        } else if (String(rs.message) == 'Error: Username is already taken!') {
        }
      });
  }
}

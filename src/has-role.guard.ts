import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { SignInComponent } from './app/pages/auth/sign-in/sign-in.component';
import { AuthService } from './app/service/auth.service';

@Injectable({
  providedIn: 'root',
})
export class HasRoleGuard implements CanActivate {
  constructor(private authService: AuthService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
      console.log(this.authService.user.roles);
      
    if (this.authService.user.roles) {
      const isAuthorized = this.authService.user.roles.includes(
        route.data['role']
      );
      if (!isAuthorized) {
        console.log('You are not allowed');
        
        window.alert('You are not allowed');
      }

      return isAuthorized;
    }

    return false;
  }
}

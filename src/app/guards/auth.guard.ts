import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../private/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> {
    const path = route.url[0].path;
    console.log(path);
    if (path == 'login' || path == 'public') {
      if (!(await this.authService.autoLogin())) {
        console.log('1');
        return true;
      } else {
        console.log('2');
        this.router.navigate(['../private/dashboard']);
        return false;
      }
    } else {
      if (await this.authService.autoLogin()) {
        console.log('3');
        return true;
      } else {
        console.log('4');
        this.router.navigate(['../public/login']);
        return false;
      }
      // console.log(path);
      // if (await this.authService.autoLogin()) {
      //   alert('works');
      //   return true;
      // } else return false;
    }

    // async canActivate(route: any): Promise<boolean> {
    //   // const path = route.url[0].path;
    //   if (await this.authService.autoLogin()) {
    //     console.log('works');
    //     return true;
    //   } else return false;
    // }
  }
}

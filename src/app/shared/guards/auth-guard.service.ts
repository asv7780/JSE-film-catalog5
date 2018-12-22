import {Injectable} from '@angular/core';
import {CanActivate, CanActivateChild, CanLoad, Router} from '@angular/router';
import {AuthService} from '../../core/services/auth.service';


@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {

  constructor(
    private authService: AuthService,
    private router: Router) {
  }

  canActivate() {

    const isLogin = this.authService.isLoggedIn();
    if (isLogin) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }

  canLoad() {
    return this.canActivate();
  }

  canActivateChild() {
    return this.canActivate();
  }
}

import {Component, OnInit} from '@angular/core';
import {AuthService} from '../core/services/auth.service';
import {Router} from '@angular/router';
import {MessagesService} from '../core/services/messages.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  credentials = {username: '', password: ''};
  errorMessage = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private msgService: MessagesService
  ) {
  }

  ngOnInit() {
    const isLogin = this.authService.isLoggedIn();
    if (isLogin) {
      this.router.navigate(['/main']);
    }
  }
  login() {
    this.errorMessage = '';

    this.authService.login(this.credentials.username, this.credentials.password)
      .subscribe(
        () => {
          this.msgService.setMessage({
            type: 'success',
            body: `${this.credentials.username}, you have successfully logged in. Welcome!`
          });
          setTimeout(() => {
            this.router.navigate(['/main']);
          }, 1500);
        },
        err => {
          this.errorMessage = err.error.error;
          this.msgService.setMessage({
            type: 'danger',
            body: err.error.error
          });
        }
      );
  }

  goToRegistration() {
    this.router.navigate(['registration']);
  }

  goToAbout() {
    this.router.navigate(['/about']);
  }
}

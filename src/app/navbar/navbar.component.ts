import {Component, Input, OnInit} from '@angular/core';
import {AuthService} from '../core/services/auth.service';
import {Router} from '@angular/router';
import {MessagesService} from '../core/services/messages.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  @Input() links;

  constructor(
    private authService: AuthService,
    private router: Router,
    private msgService: MessagesService
  ) {
  }

  get isLoggedIn() {
    return this.authService.isLoggedIn();
  }

  ngOnInit() {
  }

  logOut() {
    this.router.navigate(['/login'])
      .then((isNavigate) => {
        if (isNavigate) {
          this.authService.logout();
        }
      })
      .catch((err) => {
        this.msgService.setMessage({
          type: 'danger',
          body: err
        });
      });
  }

  goToAbout() {
    this.router.navigate(['/about']);
  }
}

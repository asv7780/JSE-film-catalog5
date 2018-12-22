import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']

})

export class AppComponent {
  links: object[] = [
    { path: '/main', label: 'Discover', active: 'active'},
    { path: '/films', label: 'Movies', active: 'active'},
    { path: '/actors', label: 'Actors', active: 'active'},
    { path: '/about', label: 'About', active: 'active'},
  ];
}

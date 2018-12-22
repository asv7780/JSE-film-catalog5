import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent implements OnInit {

  constructor(private router: Router) { }

  sec = 5;

  setCounter() {
    const interval = setInterval(() => {
      this.sec -= 1;
      console.log(this.sec);
      if (this.sec === 0) {
        this.router.navigate(['/login']);
        clearInterval(interval);
      }
    }, 1000);
  }

  ngOnInit() {
    this.setCounter();
  }

}

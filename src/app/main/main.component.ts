import {Component, OnInit} from '@angular/core';
import {ApiService} from '../api.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  films = [];
  actors = [];

  constructor(public apiService: ApiService) {
  }

  showFilms() {
    this.apiService.getPopularFilms().subscribe(
      (filmsData: any) => {
        const res = filmsData.results;
        this.films = res.splice(0, 6);
        console.log(res);
      },
      err => {
        console.log('error');
      });
  }

  showActors() {
    this.apiService.getPopularActors().subscribe(
      (actorsData: any) => {
        const res = actorsData.results;
        this.actors = res.splice(0, 6);
      },
      err => {
        console.log('error');
      });
  }

  ngOnInit() {
    this.showFilms();
    this.showActors();
  }
}

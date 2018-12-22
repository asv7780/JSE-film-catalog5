import {Component, OnInit} from '@angular/core';
import {ApiService} from '../api.service';
import {FavoriteService} from '../favorite.service';
import {Actors} from '../core/models/actors';
import {ActorsData} from '../core/models/actors-data';
import {SearchService} from '../search/search.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-actors',
  templateUrl: './actors.component.html',
  styleUrls: ['./actors.component.scss']
})
export class ActorsComponent implements OnInit {
  persons: Actors[];
  personsData: Actors[];
  favoriteList: Array<number>;
  totalPages: number;
  isLoad = false;
  subscription: Subscription;

  constructor(
    private apiService: ApiService,
    private favoriteService: FavoriteService,
    private searchService: SearchService
  ) {
  }

  ngOnInit() {
    this.favoriteList = this.favoriteService.getActorsFavorite();
    this.apiService.getPopularActors(1).subscribe((data: ActorsData) => {
      this.isLoad = true;
      this.personsData = data.results;
      this.persons = [...this.personsData];
      this.buildFavorites();
      this.totalPages = data.total_pages;
    });
    this.subscription = this.searchService.searchMake$.subscribe((searchString: string) => {
      this.doSearch(searchString);
    });
  }

  buildFavorites() {
    this.favoriteList = this.favoriteService.getActorsFavorite();
    this.persons.map(person => {
      person.isFavorite = this.favoriteList.indexOf(person.id) > -1;
    });
  }

  doSearch(searchString) {
    this.isLoad = false;
    if (searchString !== 0) {
      this.apiService.getActorsSearch(searchString, 1).subscribe(
        (searchResult: any) => {
          this.persons = searchResult.results;
          this.isLoad = true;
        });
    } else {
      this.persons = [...this.personsData].filter((actors: Actors) => {
        return actors.name.toLowerCase().includes(searchString.toLowerCase().trim());
      });
    }
  }

  getNextPage(pageNumber) {
    this.isLoad = false;
    this.apiService.getPopularActors(pageNumber).subscribe((data: ActorsData) => {
      this.isLoad = true;
      this.personsData = [...this.personsData, ...data.results];
      this.persons = [...this.personsData];
      this.buildFavorites();
    });
  }

  starPerson(id: number) {
    if (this.favoriteList.indexOf(id) > -1) {
      this.favoriteService.removeActorsFromFavorites(id);
    } else {
      this.favoriteService.addActorsToFavorite(id);
    }

    this.buildFavorites();
  }

}

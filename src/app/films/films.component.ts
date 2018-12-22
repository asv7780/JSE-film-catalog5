import {Component, OnDestroy, OnInit} from '@angular/core';
import {ApiService} from '../api.service';
import {SearchService} from '../search/search.service';
import {Subscription} from 'rxjs';
import {FavoriteService} from '../favorite.service';
import {Film} from '../core/models/film';
import {FilmData} from '../core/models/film-data';

@Component({
  selector: 'app-films',
  templateUrl: './films.component.html',
  styleUrls: ['./films.component.scss']
})

export class FilmsComponent implements OnInit, OnDestroy {
  filmData: Array<Film>;
  films: Array<Film> = [];
  favoriteList: Array<number>;
  bookmarksList: Array<number>;
  totalPages: number;
  isLoad = false;
  subscription: Subscription;


  constructor(
    private apiService: ApiService,
    private searchService: SearchService,
    private favoriteService: FavoriteService
  ) {
  }

  ngOnInit() {
    this.favoriteList = this.favoriteService.getFilmsFavorite();
    this.bookmarksList = this.favoriteService.getFilmsBookmark();
    this.apiService.getPopularFilms(1).subscribe((data: FilmData) => {
      this.isLoad = true;
      this.filmData = data.results;
      this.films = [...this.filmData];
      this.buildFavorites();
      this.totalPages = data.total_pages;
    });

    this.subscription = this.searchService.searchMake$.subscribe((searchString: string) => {
      this.doSearch(searchString);
    });
  }

  buildFavorites() {
    this.favoriteList = this.favoriteService.getFilmsFavorite();
    this.bookmarksList = this.favoriteService.getFilmsBookmark();
    this.films.map(film => {
      film.isFavorite = this.favoriteList.indexOf(film.id) > -1;
      film.isBookMarked = this.bookmarksList.indexOf(film.id) > -1;
    });
  }

  doSearch(searchString) {
    this.isLoad = false;
    if (searchString !== '') {
      this.apiService.getFilmSearch(searchString, 1).subscribe(
        (searchResults: any) => {
          this.films = searchResults.results;
          this.isLoad = true;
        },
        err => {
          console.log('error');
        });
     } else {
      this.buildFavorites();
    }
  }

  getNextPage(pageNumber) {
    this.isLoad = false;
    this.apiService.getPopularFilms(pageNumber).subscribe((data: any) => {
      this.isLoad = true;
      this.filmData = [...this.filmData, ...data.results];
      this.films = [...this.filmData];
      this.buildFavorites();
    });
  }

  starFilm(id: number) {
    if (this.favoriteList.indexOf(id) > -1) {
      this.favoriteService.removeFilmFromFavorites(id);
    } else {
      this.favoriteService.addFilmToFavorite(id);
    }

    this.buildFavorites();
  }

  bookmarkFilm(id: number) {
    if (this.bookmarksList.indexOf(id) > -1) {
      this.favoriteService.removeFilmFromBookmarks(id);
    } else {
      this.favoriteService.addFilmToBookmarks(id);
    }

    this.buildFavorites();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}

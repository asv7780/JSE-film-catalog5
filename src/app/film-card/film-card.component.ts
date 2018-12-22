import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ApiService} from '../api.service';
import {ActivatedRoute} from '@angular/router';
import {FavoriteService} from '../favorite.service';
import {Film} from '../core/models/film';


@Component({
  selector: 'app-film-card',
  templateUrl: './film-card.component.html',
  styleUrls: ['./film-card.component.scss']
})
export class FilmCardComponent implements OnInit {
  filmId: number;
  externalId: number;
  similarMovies = [];
  filmCard: any;
  cast = [];
  crew = [];
  isLoad = false;
  isBookmark = false;
  genres;
  productionCompanies;
  productionCompaniesLogo;
  productionCountries;
  videoLinks = [];
  budget;
  revenue;
  videosLinks = [];
  canSave = true;
  favoriteList: Array<number>;
  bookmarksList: Array<number>;

  @Input() film: Film;
  @Output() makeFavorite = new EventEmitter<number>();
  @Output() makeBookmark = new EventEmitter<number>();

  constructor(public apiService: ApiService,
              private favoriteService: FavoriteService,
              private route: ActivatedRoute) {
  }

  getFilm() {
    this.isLoad = true;
    this.apiService.getMovieExternalId(this.filmId).subscribe(
      (external: any) => {
        this.externalId = external;
        this.apiService.getById(this.externalId).subscribe(
          (film: any) => {
            this.filmCard = film;
            this.getGenres();
            this.getBudget();
            this.getRevenue();
            this.getProductionCompaniesName();
            this.getProductionCompaniesLogo();
            this.getProductionCountriesName();
            this.isLoad = false;
          },
          err => {
            console.log('error film');
          }
        );
      },
      err => {
        console.log('error ext');
      }
    );
  }

  getGenres() {
    this.genres = Array.from(this.filmCard.genres, (obj) => obj['name']).join(', ');
  }

  getBudget() {
    this.budget = this.filmCard.budget.toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
  }

  getRevenue() {
    this.revenue = this.filmCard.revenue.toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
  }

  getProductionCompaniesName() {
    this.productionCompanies = Array.from(this.filmCard.production_companies, (obj) => obj['name']).join(', ');
  }

  getProductionCountriesName() {
    this.productionCountries = Array.from(this.filmCard.production_countries, (obj) => obj['name']).join(', ');
  }

  getProductionCompaniesLogo() {
    this.productionCompaniesLogo = this.filmCard.production_companies;
  }

  getTrailer() {
    this.apiService.getFilmVideo(this.filmId).subscribe(
      (videos: any) => {
        this.videoLinks = videos.results;
      },
      err => {
        console.log('error video');
      }
    );
  }

  getEmbedUrl(item) {
    return `https://www.youtube.com/embed/${item.key}?ecver=2`;
  }

  getCredits() {
    this.apiService.getFilmCredits(this.filmId).subscribe(
      (persons: any) => {
        const casting = persons.cast;
        const crewing = persons.crew;
        this.cast = casting.splice(0, 6);
        this.crew = crewing.splice(0, 5);
      },
      err => {
        console.log('error actors');
      }
    );
  }

  getSimilar() {
    this.apiService.getSimilarMovies(this.filmId).subscribe(
      (similar: any) => {
        this.similarMovies = similar.results.splice(0, 6);
      },
      err => {
        console.log('error film');
      }
    );
  }

  bookmarkFilm(id: number) {
    if (this.bookmarksList.indexOf(id) > -1) {
      this.favoriteService.removeFilmFromBookmarks(id);
    } else {
      this.favoriteService.addFilmToBookmarks(id);
    }

    this.buildFavorites();
  }

  buildFavorites() {
    this.favoriteList = this.favoriteService.getFilmsFavorite();
    this.bookmarksList = this.favoriteService.getFilmsBookmark();
  }

  openSimilar(id) {
    this.filmId = id;
    this.build();
  }

  convertMinsToHrs(min) {
    const h = Math.floor(min / 60);
    const m = min % 60;
    return `${h < 10 ? '0' + h : h}h : ${m < 10 ? '0' + m : m}m`;
  }

  build() {
    this.getFilm();
    this.getCredits();
    this.getSimilar();
    this.getTrailer();
  }

  ngOnInit() {
    this.favoriteList = this.favoriteService.getFilmsFavorite();
    this.bookmarksList = this.favoriteService.getFilmsBookmark();
    this.filmId = this.route.snapshot.params['id'];
    this.build();
  }
}



import {Inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CONFIG, Config} from './config';
import {map} from 'rxjs/operators';
import {forkJoin, Observable} from 'rxjs';
// import {Actors} from './core/models/actors';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  // apiUrl: string = 'https://api.themoviedb.org/3';
  // apiKey: string = '7ef13d986e940534bf1f8c4184907077';
  // movieUrl: string = `${this.apiUrl}/movie`;
  // searchUrl: string = `${this.apiUrl}/search`;
  // personUrl: string = `${this.apiUrl}/person`;
  // params: string = `&api_key=${this.apiKey}&language=en-US`;
  // searchParams: string = `&api_key=${this.apiKey}&language=en-US&query=`;
  // adult: string = '&include_adult=false';
  //
  // imgPath: string = 'https://image.tmdb.org/t/p';
  // midImgPath: string = `${this.imgPath}/w500`;
  // smallImgPath: string = `${this.imgPath}/w185`;
  // bigBackPath: string = `${this.imgPath}/w1280`;
  // midBackPath: string = `${this.imgPath}/w780`;
  // smallBackPath: string = `${this.imgPath}/w300`;

  // constructor(private http: HttpClient) {
  // }
  constructor(@Inject(CONFIG) public config: Config,
              private http: HttpClient
  ) {
  }
// Movies
  getPopularFilms(page?: number) {
    return this.http.get(`${this.config.movieUrl}/popular?page=${page}${this.config.params}`);
  }

  getMovieExternalId(id) {
    return this.http.get(`${this.config.movieUrl}/${id}/external_ids?api_key=${this.config.apiKey}`)
      .pipe(map((val: any) => val.imdb_id));
  }
  getSimilarMovies(id) {
    return this.http.get(`${this.config.movieUrl}/${id}/similar?api_key=${this.config.apiKey}&language=en-US&page=1`);
  }

  getPopularActors(page?: number) {
    return this.http.get(`${this.config.personUrl}/popular?page=${page}${this.config.params}`);
  }
  getFilmVideo(id) {
    return this.http.get(`${this.config.movieUrl}/${id}/videos?api_key=${this.config.apiKey}&language=en-US`);
  }

  getFilmCredits(id) {
    return this.http.get(`${this.config.movieUrl}/${id}/credits?api_key=${this.config.apiKey}`);
  }
  getFilmSearch(query: string, page?: number) {
    return this.http.get(`${this.config.searchUrl}/movie?${this.config.searchParams}${query}&page=${page}${this.config.adult}`);
  }

// Actors
  getActorExternalId(id) {
    return this.http.get(`${this.config.personUrl}/${id}/external_ids?api_key=${this.config.apiKey}&language=en-US`)
      .pipe(map((val: any) => val.imdb_id));
  }
  getActorDetails(id) {
    return this.http.get(`${this.config.personUrl}/${id}?api_key=${this.config.apiKey}&language=en-US`);
  }
getActorsMovieCredits(id) {
  return this.http.get(`${this.config.personUrl}/${id}/movie_credits?api_key=${this.config.apiKey}&language=en-US`);
}
  getActorsSearch(query: string, page?: number) {
    return this.http.get(`${this.config.searchUrl}/person?${this.config.searchParams}${query}&page=${page}${this.config.adult}`);
  }
  findActPropById(id) {
    return this.http.get(`${this.config.apiUrl}/find/${id}?api_key=${this.config.apiKey}&language=en-US&external_source=imdb_id`);
  }

// Posters
  getCardPosters(value: string) {
    return `${this.config.midImgPath}${value}`;
  }
  getBackDropPosters(value: string) {
    return `${this.config.bigBackPath}${value}`;
  }
  getSmallPosters(value: string) {
    return `${this.config.smallImgPath}${value}`;
  }
  getMainPosters(value: string) {
    return `${this.config.smallImgPath}${value}`;
  }

  getById(id) {
    return this.http.get(`${this.config.movieUrl}/${id}?api_key=${this.config.apiKey}&language=en-US`);
  }
}

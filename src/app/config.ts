import { InjectionToken } from '@angular/core';


export class Config {
  apiUrl: string = 'https://api.themoviedb.org/3';
  apiKey: string = 'fc264fbd1650e19b79c63e0ae2473937';
  searchUrl: string = `${this.apiUrl}/search`;
  movieUrl: string = `${this.apiUrl}/movie`;
  adult: string = '&include_adult=false';

  personUrl: string = `${this.apiUrl}/person`;
  params: string = `&api_key=${this.apiKey}&language=en-US`;
  searchParams: string = `&api_key=${this.apiKey}&language=en-US&query=`;
  searchById: string = `api_key=${this.apiKey}&language=ru-RU&external_source=imdb_id`;
  imgPath: string = 'https://image.tmdb.org/t/p';
  midImgPath: string = `${this.imgPath}/w500`;
  smallImgPath: string = `${this.imgPath}/w185`;
  bigBackPath: string = `${this.imgPath}/w1280`;
  midBackPath: string = `${this.imgPath}/w780`;
  smallBackPath: string = `${this.imgPath}/w300`;
}

export const CONFIG = new InjectionToken<Config>('CONFIG');

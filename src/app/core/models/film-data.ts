import {Film} from './film';

export class FilmData {
  page: number;
  results: Array<Film>;
  total_results: number;
  total_pages: number;
}

export class Film {
  poster_path?: string;
  tagline: string;
  overview: string;
  release_date: string;
  genre_ids: Array<number>;
  id: number;
  original_title: string;
  original_language: string;
  title: string;
  backdrop_path?: string;
  popularity: number;
  vote_count: number;
  video: boolean;
  production_companies: Array<any>;
  vote_average: number;
  isFavorite?: boolean;
  isBookMarked?: boolean;
  revenue: number;
}

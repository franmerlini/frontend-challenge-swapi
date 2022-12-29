import { Movie } from './Movie.model';

export interface FlimsResponse {
  count: number;
  next: string;
  previous: string;
  results: Movie[];
}

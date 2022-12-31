import { Movie } from './movie.model';

export interface FlimsResponse {
  count: number;
  next: string;
  previous: string;
  results: Movie[];
}

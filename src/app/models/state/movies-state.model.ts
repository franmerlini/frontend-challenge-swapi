import { Movie } from '../domain';

export interface MoviesState {
  loadingData: boolean;
  movies: Movie[];
  error: string;
}

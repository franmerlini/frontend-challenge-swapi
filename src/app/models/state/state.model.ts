import { CharactersState, MoviesState } from '../state';

export interface State {
  characters: CharactersState;
  movies: MoviesState;
}

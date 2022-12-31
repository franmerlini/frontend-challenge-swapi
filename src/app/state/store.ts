import { ActionReducerMap } from '@ngrx/store';
import { State } from '../models/state';
import { CharactersEffects, MoviesEffects } from './effects';
import { charactersReducer, moviesReducer } from './reducers';

export const ROOT_REDUCERS: ActionReducerMap<State> = {
  characters: charactersReducer,
  movies: moviesReducer,
};

export const ROOT_EFFECTS = [MoviesEffects, CharactersEffects];

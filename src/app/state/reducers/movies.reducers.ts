import { createReducer, on } from '@ngrx/store';
import { MoviesState } from 'src/app/models/state/movies-state.model';
import { MoviesActions } from '../actions/movies.actions';

const initialState: MoviesState = {
  loadingData: false,
  movies: [],
  error: '',
};

export const moviesReducer = createReducer(
  initialState,

  // GENERAL
  on(MoviesActions.getData, (state) => ({
    ...state,
    loadingData: true,
  })),

  // SUCCESS
  on(MoviesActions.getDataSuccess, (state, { movies }) => ({
    ...state,
    movies,
    loadingData: false,
  })),

  // ERROR
  on(MoviesActions.getDataError, (state, { error }) => ({
    ...state,
    error,
  }))
);

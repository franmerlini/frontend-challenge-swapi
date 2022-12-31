import { createSelector } from '@ngrx/store';
import { State } from 'src/app/models/state';

const selectMoviesState = (state: State) => state.movies;

const selectLoadingData = createSelector(
  selectMoviesState,
  (state) => state.loadingData
);

const selectMovies = createSelector(selectMoviesState, (state) => state.movies);

export const MoviesSelectors = {
  selectLoadingData,
  selectMovies,
};

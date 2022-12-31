import { createAction, props } from '@ngrx/store';
import { Movie } from 'src/app/models/domain';

// GENERAL
const getData = createAction('[Movies Component] Get data');

// SUCCESS
const getDataSuccess = createAction(
  '[Films API] Get data success',
  props<{ movies: Movie[] }>()
);

// ERROR
const getDataError = createAction(
  '[Films API] Get data error',
  props<{ error: string }>()
);

export const MoviesActions = {
  getData,
  getDataSuccess,
  getDataError,
};

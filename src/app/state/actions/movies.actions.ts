import { createAction, props } from '@ngrx/store';
import { Movie } from 'src/app/models/domain';

// GENERAL
const getData = createAction('[Movies Component] Get data');

// DATA ALREDY EXISTS
const dataAlreadyExists = createAction(
  '[Movies Component] Data already exists'
);

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
  dataAlreadyExists,
  getDataSuccess,
  getDataError,
};

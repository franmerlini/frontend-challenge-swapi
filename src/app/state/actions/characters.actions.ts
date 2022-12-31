import { createAction, props } from '@ngrx/store';
import { Character } from 'src/app/models/domain';

// GENERAL
const getData = createAction('[Characters Component] Get data');

// DATA ALREDY EXISTS
const dataAlreadyExists = createAction(
  '[Characters Component] Data already exists'
);

// SUCCESS
const getDataSuccess = createAction(
  '[People API] Get data success',
  props<{ characters: Character[] }>()
);

// ERROR
const getDataError = createAction(
  '[People API] Get data error',
  props<{ error: string }>()
);

export const CharactersActions = {
  getData,
  dataAlreadyExists,
  getDataSuccess,
  getDataError,
};

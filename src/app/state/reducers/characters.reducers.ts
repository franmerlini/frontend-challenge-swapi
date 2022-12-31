import { createReducer, on } from '@ngrx/store';
import { CharactersState } from 'src/app/models/state';
import { CharactersActions } from '../actions/characters.actions';

const initialState: CharactersState = {
  loadingData: false,
  characters: [],
  error: '',
};

export const charactersReducer = createReducer(
  initialState,

  // GENERAL
  on(CharactersActions.getData, (state) => ({
    ...state,
    loadingData: true,
  })),

  // DATA ALREADY EXISTS
  on(CharactersActions.dataAlreadyExists, (state) => ({
    ...state,
    loadingData: false,
  })),

  // SUCCESS
  on(CharactersActions.getDataSuccess, (state, { characters }) => ({
    ...state,
    characters,
    loadingData: false,
  })),

  // ERROR
  on(CharactersActions.getDataError, (state, { error }) => ({
    ...state,
    error,
  }))
);

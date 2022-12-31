import { createSelector } from '@ngrx/store';
import { State } from 'src/app/models/state';

const selectCharactersState = (state: State) => state.characters;

const selectLoadingData = createSelector(
  selectCharactersState,
  (state) => state.loadingData
);

const selectCharacters = createSelector(
  selectCharactersState,
  (state) => state.characters
);

export const CharactersSelectors = {
  selectLoadingData,
  selectCharacters: selectCharacters,
};

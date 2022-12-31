import { Character } from '../domain';

export interface CharactersState {
  loadingData: boolean;
  characters: Character[];
  error: string;
}

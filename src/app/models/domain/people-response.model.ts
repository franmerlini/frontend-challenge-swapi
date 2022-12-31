import { Character } from './character.model';

export interface PeopleResponse {
  count: number;
  next: string;
  previous: string;
  results: Character[];
}

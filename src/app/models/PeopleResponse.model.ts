import { Character } from './Character.model';

export interface PeopleResponse {
  count: number;
  next: string;
  previous: string;
  results: Character[];
}

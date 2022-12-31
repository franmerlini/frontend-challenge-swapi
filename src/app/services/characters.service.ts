import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Character, PeopleResponse } from '../models/domain';

@Injectable({
  providedIn: 'root',
})
export class CharactersService {
  private api_url = 'https://swapi.dev/api/people';

  constructor(private http: HttpClient) {}

  getCharacters(): Observable<Character[]> {
    return this.http
      .get<PeopleResponse>(this.api_url)
      .pipe(map((res) => res.results));
  }

  getCharacter(id: number): Observable<Character> {
    return this.http.get<Character>(`${this.api_url}/${id}`);
  }
}

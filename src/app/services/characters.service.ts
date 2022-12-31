import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { expand, filter, map, Observable, scan } from 'rxjs';
import { Character, PeopleResponse } from '../models/domain';

@Injectable({
  providedIn: 'root',
})
export class CharactersService {
  private api_url = 'https://swapi.dev/api/people';

  constructor(private http: HttpClient) {}

  getCharacters(): Observable<Character[]> {
    return this.getCharactersFromUrl(this.api_url).pipe(
      filter((data) => !!data.next),
      expand((data) => this.getCharactersFromUrl(data.next)),
      scan((acc, data) => acc.concat(data.characters), [] as Character[])
    );
  }

  getCharacter(id: number): Observable<Character> {
    return this.http.get<Character>(`${this.api_url}/${id}`);
  }

  private getCharactersFromUrl(
    url: string
  ): Observable<{ next: string; characters: Character[] }> {
    return this.http
      .get<PeopleResponse>(url)
      .pipe(map((res) => ({ next: res.next, characters: res.results })));
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { FlimsResponse, Movie } from '../models';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  private api_url = 'https://swapi.dev/api/films';

  constructor(private http: HttpClient) {}

  getMovies(): Observable<Movie[]> {
    return this.http
      .get<FlimsResponse>(this.api_url)
      .pipe(map((res) => res.results));
  }

  getMovie(id: number): Observable<Movie> {
    return this.http.get<Movie>(`${this.api_url}/${id}`);
  }
}

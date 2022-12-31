import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, Observable, Subscription } from 'rxjs';
import { Character, Movie } from 'src/app/models/domain';
import { State } from 'src/app/models/state';
import { CharactersActions, MoviesActions } from 'src/app/state/actions';
import { CharactersSelectors, MoviesSelectors } from 'src/app/state/selectors';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.scss'],
})
export class CharactersComponent implements OnInit {
  public loadingData$: Observable<boolean> = this.store.select(
    CharactersSelectors.selectLoadingData
  );
  public characters$: Observable<Character[]> = this.store.select(
    CharactersSelectors.selectCharacters
  );
  public movies$: Observable<Movie[]> = this.store.select(
    MoviesSelectors.selectMovies
  );
  public moviesSubscription!: Subscription;

  constructor(private readonly store: Store<State>) {}

  ngOnInit(): void {
    this.store.dispatch(CharactersActions.getData());
    this.store.dispatch(MoviesActions.getData());
  }

  public getMovie(url: string): Observable<Movie | undefined> {
    return this.movies$.pipe(
      map((movies) => movies.find((movie) => movie.url === url))
    );
  }
}

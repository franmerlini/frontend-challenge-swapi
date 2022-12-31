import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { filter, map, Observable, Subscription, tap } from 'rxjs';
import { Character, Movie } from 'src/app/models/domain';
import { State } from 'src/app/models/state';
import { CharactersActions, MoviesActions } from 'src/app/state/actions';
import { CharactersSelectors, MoviesSelectors } from 'src/app/state/selectors';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss'],
})
export class MoviesComponent implements OnInit, OnDestroy {
  public loadingData$: Observable<boolean> = this.store.select(
    MoviesSelectors.selectLoadingData
  );
  public movies$: Observable<Movie[]> = this.store.select(
    MoviesSelectors.selectMovies
  );
  public characters$: Observable<Character[]> = this.store.select(
    CharactersSelectors.selectCharacters
  );
  public charactersSubscription!: Subscription;

  constructor(private readonly store: Store<State>) {}

  ngOnInit(): void {
    this.loadData();
  }

  private loadData(): void {
    this.store.dispatch(MoviesActions.getData());
    this.charactersSubscription = this.characters$
      .pipe(
        filter((characters) => !characters.length),
        tap(() => this.store.dispatch(CharactersActions.getData()))
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.charactersSubscription.unsubscribe();
  }

  public getCharacter(url: string): Observable<Character | undefined> {
    return this.characters$.pipe(
      map((characters) => characters.find((character) => character.url === url))
    );
  }
}

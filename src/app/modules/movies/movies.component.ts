import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import { Character, Movie } from 'src/app/models/domain';
import { State } from 'src/app/models/state';
import { getCharacterId } from 'src/app/shared/utilities';
import { CharactersActions, MoviesActions } from 'src/app/state/actions';
import { CharactersSelectors, MoviesSelectors } from 'src/app/state/selectors';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss'],
})
export class MoviesComponent implements OnInit {
  public loadingData$: Observable<boolean> = this.store.select(
    MoviesSelectors.selectLoadingData
  );
  public movies$: Observable<Movie[]> = this.store.select(
    MoviesSelectors.selectMovies
  );
  public characters$: Observable<Character[]> = this.store.select(
    CharactersSelectors.selectCharacters
  );

  constructor(
    private readonly store: Store<State>,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.store.dispatch(MoviesActions.getData());
    this.store.dispatch(CharactersActions.getData());
  }

  public getCharacter(url: string): Observable<Character | undefined> {
    return this.characters$.pipe(
      map((characters) => characters.find((character) => character.url === url))
    );
  }

  public findCharacter(url: string): void {
    this.router.navigate([`/characters/${getCharacterId(url)}`]);
  }
}

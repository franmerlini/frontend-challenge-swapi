import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import {
  filter,
  map,
  merge,
  Observable,
  startWith,
  switchMap,
  tap,
} from 'rxjs';
import { Character, Movie } from 'src/app/models/domain';
import { State } from 'src/app/models/state';
import { getCharacterId } from 'src/app/shared/utilities';
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
  public form!: FormGroup;
  public filteredCharacters$!: Observable<Character[]>;

  constructor(
    private readonly store: Store<State>,
    private readonly fb: FormBuilder,
    private readonly route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.fetchData();
    this.createForm();
    this.startFiltering();
  }

  private fetchData(): void {
    this.store.dispatch(CharactersActions.getData());
    this.store.dispatch(MoviesActions.getData());
  }

  private createForm(): void {
    this.form = this.fb.group({
      filter: [''],
    });
  }

  private startFiltering(): void {
    const filterValueChanges$ = this.filter.valueChanges.pipe(
      map((value) => value as string),
      startWith('')
    );

    const searchedCharacter$ = this.route.params.pipe(
      map((params) => params['id'] as string),
      switchMap((id) =>
        this.characters$.pipe(
          map(
            (characters) =>
              characters.find(
                (character) => getCharacterId(character.url) === id
              )?.name ?? ''
          ),
          filter((name) => !!name),
          tap((name) => this.filter.patchValue(name))
        )
      )
    );

    this.filteredCharacters$ = merge(
      filterValueChanges$,
      searchedCharacter$
    ).pipe(
      switchMap((filterValue) =>
        this.characters$.pipe(
          map((characters) =>
            characters.filter((character) =>
              this.existMatch(character, filterValue)
            )
          )
        )
      )
    );
  }

  private existMatch(character: Character, filterValue: string): boolean {
    const { name, gender, eye_color } = character;
    return (
      name.toLowerCase().startsWith(filterValue.toLowerCase()) ||
      gender.toLowerCase().startsWith(filterValue.toLowerCase()) ||
      eye_color.toLowerCase().startsWith(filterValue.toLowerCase())
    );
  }

  public getMovie(url: string): Observable<Movie | undefined> {
    return this.movies$.pipe(
      map((movies) => movies.find((movie) => movie.url === url))
    );
  }

  get filter(): AbstractControl {
    return this.form.get('filter') as AbstractControl;
  }
}

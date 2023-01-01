import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { combineLatest, map, Observable, startWith } from 'rxjs';
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
  public form!: FormGroup;
  public filteredCharacters$!: Observable<Character[]>;

  constructor(
    private readonly store: Store<State>,
    private readonly fb: FormBuilder
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
    const filter$: Observable<string> = this.filter.valueChanges.pipe(
      startWith('')
    );
    this.filteredCharacters$ = combineLatest([this.characters$, filter$]).pipe(
      map(([characters, filter]) => {
        return characters.filter((character) => {
          return (
            character.name.toLowerCase().startsWith(filter.toLowerCase()) ||
            character.gender.toLowerCase().startsWith(filter.toLowerCase()) ||
            character.eye_color.toLowerCase().startsWith(filter.toLowerCase())
          );
        });
      })
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

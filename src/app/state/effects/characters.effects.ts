import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, exhaustMap, map, of, withLatestFrom } from 'rxjs';
import { State } from 'src/app/models/state';
import { CharactersService } from 'src/app/services/characters.service';
import { CharactersActions } from '../actions/characters.actions';
import { CharactersSelectors } from '../selectors';

@Injectable()
export class CharactersEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly charactersService: CharactersService,
    private readonly store: Store<State>
  ) {}

  fetchedData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CharactersActions.getData),
      withLatestFrom(
        this.store.select(CharactersSelectors.selectCharacters),
        (_, characters) => characters
      ),
      exhaustMap((characters) => {
        if (!characters.length) {
          return this.charactersService.getCharacters().pipe(
            map((characters) =>
              CharactersActions.getDataSuccess({ characters })
            ),
            catchError((error) => of(CharactersActions.getDataError({ error })))
          );
        }
        return of(CharactersActions.dataAlreadyExists());
      })
    )
  );
}

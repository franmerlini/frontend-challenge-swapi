import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, of } from 'rxjs';
import { CharactersService } from 'src/app/services/characters.service';
import { CharactersActions } from '../actions/characters.actions';

@Injectable()
export class CharactersEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly charactersService: CharactersService
  ) {}

  fetchedData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CharactersActions.getData),
      exhaustMap(() =>
        this.charactersService.getCharacters().pipe(
          map((characters) => CharactersActions.getDataSuccess({ characters })),
          catchError((error) => of(CharactersActions.getDataError({ error })))
        )
      )
    )
  );
}

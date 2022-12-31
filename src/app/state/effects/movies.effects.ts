import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, exhaustMap, map, of, withLatestFrom } from 'rxjs';
import { State } from 'src/app/models/state';
import { MoviesService } from 'src/app/services';
import { MoviesActions } from '../actions/movies.actions';
import { MoviesSelectors } from '../selectors';

@Injectable()
export class MoviesEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly moviesService: MoviesService,
    private readonly store: Store<State>
  ) {}

  fetchedData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MoviesActions.getData),
      withLatestFrom(
        this.store.select(MoviesSelectors.selectMovies),
        (_, movies) => movies
      ),
      exhaustMap((movies) => {
        if (!movies.length) {
          return this.moviesService.getMovies().pipe(
            map((movies) => MoviesActions.getDataSuccess({ movies })),
            catchError((error) => of(MoviesActions.getDataError({ error })))
          );
        }
        return of(MoviesActions.dataAlreadyExists());
      })
    )
  );
}

import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, of } from 'rxjs';
import { MoviesService } from 'src/app/services';
import { MoviesActions } from '../actions/movies.actions';

@Injectable()
export class MoviesEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly moviesService: MoviesService
  ) {}

  fetchedData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MoviesActions.getData),
      exhaustMap(() =>
        this.moviesService.getMovies().pipe(
          map((movies) => MoviesActions.getDataSuccess({ movies })),
          catchError((error) => of(MoviesActions.getDataError({ error })))
        )
      )
    )
  );
}

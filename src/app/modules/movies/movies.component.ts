import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Movie } from 'src/app/models/domain';
import { State } from 'src/app/models/state';
import { MoviesActions } from 'src/app/state/actions';
import { MoviesSelectors } from 'src/app/state/selectors';

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

  constructor(private readonly store: Store<State>) {}

  ngOnInit(): void {
    this.loadData();
  }

  private loadData(): void {
    this.store.dispatch(MoviesActions.getData());
  }
}

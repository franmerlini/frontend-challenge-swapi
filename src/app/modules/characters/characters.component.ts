import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Character } from 'src/app/models/domain';
import { State } from 'src/app/models/state';
import { CharactersActions } from 'src/app/state/actions';
import { CharactersSelectors } from 'src/app/state/selectors';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.scss'],
})
export class CharactersComponent {
  public loadingData$: Observable<boolean> = this.store.select(
    CharactersSelectors.selectLoadingData
  );
  public characters$: Observable<Character[]> = this.store.select(
    CharactersSelectors.selectCharacters
  );

  constructor(private readonly store: Store<State>) {}

  ngOnInit(): void {
    this.loadData();
  }

  private loadData(): void {
    this.store.dispatch(CharactersActions.getData());
  }
}

import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Character } from 'src/app/models';
import { CharactersService } from 'src/app/services/characters.service';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.scss'],
})
export class CharactersComponent {
  public characters$: Observable<Character[]> =
    this.charactersService.getCharacters();

  constructor(private charactersService: CharactersService) {}
}

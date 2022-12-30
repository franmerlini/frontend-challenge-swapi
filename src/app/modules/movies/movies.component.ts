import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Movie } from 'src/app/models';
import { MoviesService } from 'src/app/services';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss'],
})
export class MoviesComponent {
  public movies$: Observable<Movie[]> = this.moviesService.getMovies();

  constructor(private moviesService: MoviesService) {}
}

import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Movie } from 'src/app/models';
import { MoviesService } from 'src/app/services';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss'],
})
export class MoviesComponent implements OnInit {
  public movies$: Observable<Movie[]> = new Observable();

  constructor(private moviesService: MoviesService) {}

  ngOnInit(): void {
    this.movies$ = this.moviesService.getMovies();
  }
}

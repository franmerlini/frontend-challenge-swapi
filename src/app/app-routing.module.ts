import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    loadChildren: () => import('./modules').then((m) => m.HomeModule),
  },
  {
    path: 'movies',
    loadChildren: () => import('./modules').then((m) => m.MoviesModule),
  },
  {
    path: 'characters',
    loadChildren: () => import('./modules').then((m) => m.CharactersModule),
  },
  // 404 Not Found
  { path: '**', redirectTo: 'home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

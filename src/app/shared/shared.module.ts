import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { PaginatorComponent } from './components/paginator/paginator.component';
import { ToArrayPipe } from './pipes/to-array.pipe';

@NgModule({
  declarations: [PaginatorComponent, ToArrayPipe],
  imports: [CommonModule, ReactiveFormsModule, NgxPaginationModule],
  exports: [
    ReactiveFormsModule,
    PaginatorComponent,
    NgxPaginationModule,
    ToArrayPipe,
  ],
})
export class SharedModule {}

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { PaginatorComponent } from './components/paginator/paginator.component';

@NgModule({
  declarations: [PaginatorComponent],
  imports: [CommonModule, ReactiveFormsModule],
  exports: [ReactiveFormsModule, PaginatorComponent],
})
export class SharedModule {}

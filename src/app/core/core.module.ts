import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FooterComponent, NavbarComponent } from './layout';
import { LayoutComponent } from './layout/layout.component';

@NgModule({
  declarations: [NavbarComponent, FooterComponent, LayoutComponent],
  imports: [CommonModule, RouterModule],
})
export class CoreModule {}

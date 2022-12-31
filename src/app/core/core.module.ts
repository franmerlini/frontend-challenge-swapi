import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SpinnerInterceptor } from './interceptors';
import { FooterComponent, NavbarComponent } from './layout';
import { LayoutComponent } from './layout/layout.component';

@NgModule({
  declarations: [NavbarComponent, FooterComponent, LayoutComponent],
  imports: [CommonModule, RouterModule],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      multi: true,
      useClass: SpinnerInterceptor,
    },
  ],
})
export class CoreModule {}

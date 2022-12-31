import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgxSpinner, NgxSpinnerService } from 'ngx-spinner';
import { finalize, Observable } from 'rxjs';

@Injectable()
export class SpinnerInterceptor implements HttpInterceptor {
  private requestsSent = 0;
  private primarySpinner!: NgxSpinner;

  constructor(private readonly ngxSpinnerService: NgxSpinnerService) {
    this.ngxSpinnerService.getSpinner('primary').subscribe((spinner) => {
      this.primarySpinner = spinner;
    });
  }

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (
      ++this.requestsSent === 1 &&
      (!this.primarySpinner || !this.primarySpinner.show)
    ) {
      this.ngxSpinnerService.show();
    }
    return next.handle(request).pipe(
      finalize(() => {
        --this.requestsSent;
        if (this.requestsSent === 0) {
          setTimeout(() => {
            if (this.requestsSent === 0 && this.primarySpinner.show) {
              this.ngxSpinnerService.hide();
            }
          }, 15);
        }
      })
    );
  }
}

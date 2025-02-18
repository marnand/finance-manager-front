import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { Common } from '../utils/common';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  #authService = inject(AuthService);
  #common = inject(Common);

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const token = this.#authService.getToken();

    if (token) {
      const cloned = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
      return next.handle(cloned).pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 401 || error.status === 403) this.handleLogout();
          return throwError(() => error);
        }));
    }
    return next.handle(req);
  }

  private handleLogout(): void {
    this.#authService.removeToken();
    setTimeout(() => this.#common.goToPage('/login'), 1000);
  }
}

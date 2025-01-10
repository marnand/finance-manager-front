import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class Common {
  private _router = inject(Router);

  goToPage(page: string) {
    this._router.navigate([page]);
  }
}
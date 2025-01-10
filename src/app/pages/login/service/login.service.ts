import { HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Result } from '@app/core/model/Result';
import { AuthService } from '@app/core/services/auth.service';
import { BaseService } from '@app/core/services/base.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService extends BaseService {
  #auth = inject(AuthService);

  getUsers(id: number = 0) {
    return this.get(`users`, id === 0 ? undefined : new HttpParams().set('id', id));
  }

  login(body: any): Observable<Result<string>> {
    return this.post('users/login', body);
  }

  setToken(token: string) {
    this.#auth.setToken(token);
  }
}

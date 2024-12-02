import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from '@app/core/services/base.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService extends BaseService {

  registerUser(body: any) {
    this.post('users', body);
  }

  getUsers(id: number = 0) {
    return this.get(`users`, id === 0 ? undefined : new HttpParams().set('id', id));
  }
}

import { Injectable } from '@angular/core';
import { Result } from '@app/core/model/Result';
import { BaseService } from '@app/core/services/base.service';
import { Observable } from 'rxjs';
import { RegistrationDTO } from '../dto/RegisterDTO';

@Injectable({
  providedIn: 'root'
})
export class RegisterService extends BaseService {
  register(body: RegistrationDTO): Observable<Result<Number>> {
    return this.post<Number>('users', body).pipe();
  }
}
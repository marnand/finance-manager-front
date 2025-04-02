import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Result } from '@app/core/model/Result';
import { BaseService } from '@app/core/services/base.service';
import { Observable } from 'rxjs';
import { Create } from '../entities/Model';

@Injectable({
  providedIn: 'root'
})
export class TransactionService extends BaseService {  
  create(body: Create): Observable<Result<Number>> {
    return this.post<Number>('transactions', body);
  }

  getBy(id: number = 0) { 
    return this.get('transactions', new HttpParams().set('id', id));
  }
}
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { Observable } from 'rxjs';
import { Result } from '../model/Result';

@Injectable({
  providedIn: 'root'
})
export abstract class BaseService {
  private readonly _http = inject(HttpClient);
  private readonly _baseUrl = environment.apiUrl;
  private readonly _headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  /**
   * Método GET
   * @param endpoint - Endpoint da API
   * @param params - Parâmetros opcionais
   * @returns Observable com os dados
   */
  get<T>(endpoint: string, params?: HttpParams): Observable<Result<T>> {
    return this._http.get<Result<T>>(`${this._baseUrl}/${endpoint}`, { params });
  }

  /**
   * Método POST
   * @param endpoint - Endpoint da API
   * @param body - Dados para envio
   * @param headers - Headers opcionais
   * @returns Observable com os dados
   */
  post<T>(endpoint: string, body: any, headers?: HttpHeaders): Observable<Result<T>> {
    return this._http.post<Result<T>>(`${this._baseUrl}/${endpoint}`, body, headers ? { headers  } : { headers: this._headers });
  }

  /**
   * Método PUT
   * @param endpoint - Endpoint da API
   * @param body - Dados para atualização
   * @param headers - Headers opcionais
   * @returns Observable com os dados
   */
  put<T>(endpoint: string, body: any, headers?: HttpHeaders): Observable<Result<T>> {
    return this._http.put<Result<T>>(`${this._baseUrl}/${endpoint}`, body, headers ? { headers  } : { headers: this._headers });
  }

  /**
   * Método DELETE
   * @param endpoint - Endpoint da API
   * @param params - Parâmetros opcionais
   * @returns Observable com os dados
   */
  delete<T>(endpoint: string, params?: HttpParams): Observable<Result<T>> {
    return this._http.delete<Result<T>>(`${this._baseUrl}/${endpoint}`, { params });
  }

  /**
   * Método PATCH
   * @param endpoint - Endpoint da API
   * @param body - Dados para atualização parcial
   * @param headers - Headers opcionais
   * @returns Observable com os dados
   */
  patch<T>(endpoint: string, body: any, headers?: HttpHeaders): Observable<Result<T>> {
    return this._http.patch<Result<T>>(`${this._baseUrl}/${endpoint}`, body, headers ? { headers  } : { headers: this._headers });
  }

}

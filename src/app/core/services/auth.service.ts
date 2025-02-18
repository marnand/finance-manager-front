import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly TOKEN_KEY = 'auth_token';

  constructor() {}

  isAuthenticated(): boolean {
    const token = this.getToken();
    return token !== null;

    // try {
    //   // Verifica se o token está expirado
    //   const payload = JSON.parse(atob(token.split('.')[1]));
    //   const expiry = payload.exp * 1000; // Converte para milissegundos
    //   return expiry > Date.now();
    // } catch {
    //   return false;
    // }
  }

  getToken = (): string | null => localStorage.getItem(this.TOKEN_KEY);
  setToken = (token: string): void => localStorage.setItem(this.TOKEN_KEY, token);
  removeToken = (): void => localStorage.removeItem(this.TOKEN_KEY);
}
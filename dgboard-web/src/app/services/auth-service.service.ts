import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface IUserCredential {
  cpf: string;
  password: string;
}

export interface IResponse {
  user: IUserCredential;
  token: string;
  refreshToken: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private myAppUrl: string;
  private myApiUrl: string;
  private translateErrorMessage(error: HttpErrorResponse): string {
    if (error.error && error.error.message) {
      const errorMessage = error.error.message.toLowerCase();

      if (errorMessage.includes('cpf') || errorMessage.includes('password')) {
        return 'CPF ou senha incorretos!';
      }
    }

    return 'Ocorreu um erro ao autenticar.';
  }

  constructor(private http: HttpClient, private router: Router) {
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = 'api/sessions';
  }

  getToken(): string | null {
    return sessionStorage.getItem('token'); // Supondo que o token esteja armazenado em localStorage
  }

  loginEmployee(data: any): Observable<any> {
    return this.http.post(`${this.myAppUrl}${this.myApiUrl}`, data);
  }

  authenticate(data: IUserCredential) {
    this.http
      .post<IResponse>(`${this.myAppUrl}${this.myApiUrl}`, data)
      .subscribe(
        (res) => {
          if (res.token) {
            // console.log('res.token', res.token);
            sessionStorage.setItem('loginToken', res.token);
            this.router.navigateByUrl('/home');
          } else {
            alert('CPF ou senha inválidos');
          }
        },
        (error) => {
          // console.error('Erro ao autenticar:', error);
          alert(this.translateErrorMessage(error));
        }
      );
  }

  isAuthenticated() {
    return !!sessionStorage.getItem('loginToken');
  }

  logout() {
    sessionStorage.removeItem('loginToken');
    this.router.navigateByUrl('/login');
  }

  getTokenValid(): string | null {
    return sessionStorage.getItem('loginToken');
  }

  isTokenValid(): boolean {
    const token = this.getToken();

    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      // console.log('payload', payload);

      const currentTime = Math.floor(Date.now() / 1000);

      return payload.exp > currentTime;
    }

    return false;
  }
}

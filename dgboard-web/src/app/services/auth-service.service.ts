import { HttpClient } from '@angular/common/http';
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

  constructor(private http: HttpClient, private router: Router) {
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = 'api/sessions';
  }

  getToken(): string | null {
    return localStorage.getItem('token'); // Supondo que o token esteja armazenado em localStorage
  }

  loginEmployee(data: any): Observable<any> {
    return this.http.post(`${this.myAppUrl}${this.myApiUrl}`, data);
  }

  authenticate(data: IUserCredential) {
    this.http
      .post<IResponse>(`${this.myAppUrl}${this.myApiUrl}`, data)
      .subscribe((res) => {
        if (res.token) {
          sessionStorage.setItem('loginToken', res.token);
          this.router.navigateByUrl('/home');
        } else {
          alert('Invalid credentials');
        }
      });
  }

  isAuthenticated() {
    return !!sessionStorage.getItem('loginToken');
  }

  logout() {
    sessionStorage.removeItem('loginToken');
    this.router.navigateByUrl('/login');
  }
}

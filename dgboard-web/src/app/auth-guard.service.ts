import { Injectable } from '@angular/core';
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthService } from './services/auth-service.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate {
  constructor(
    public router: Router,
    private jwtHelper: JwtHelperService,
    private authService: AuthService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const token = sessionStorage.getItem('loginToken');
    // console.log('AuthGuardService está sendo chamado.');

    if (token) {
      const payload = token.split('.')[1]; // O payload está na segunda parte do token
      const decodedPayload = JSON.parse(atob(payload));
      // console.log('Payload do Token:', decodedPayload);

      const isExpired = this.jwtHelper.isTokenExpired(token);

      if (isExpired) {
        // Token expirou, faça o logout e redirecione para a página de login
        // console.log('Token expirado. Fazer o login novamente...');
        alert('Sua sessão expirou. Faça o login novamente.');
        // Lógica de logout: Limpar o sessionStorage, etc.
        sessionStorage.removeItem('loginToken');
        this.router.navigate(['/login']);
        return false;
      }
    }

    return true;
  }
}

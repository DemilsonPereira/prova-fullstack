import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { ListEmployeeComponent } from './components/list-employee/list-employee.component';
import { AddEditEmployeeComponent } from './components/add-edit-employee/add-edit-employee.component';

import { SharedModule } from './shared/shared.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginEmployeeComponent } from './components/login-employee/login-employee.component';
import { RouterModule } from '@angular/router';
import { AuthGuardService } from './auth-guard.service';
import { MaskedInputDirective } from './masked-input.directive';
import { JWT_OPTIONS, JwtModule } from '@auth0/angular-jwt';
import { AuthInterceptor } from './auth-interceptor';
import { GlobalAuthGuard } from './global-auth.guard';

export function jwtOptionsFactory() {
  return {
    tokenGetter: () => {
      return sessionStorage.getItem('loginToken');
    },
  };
}

@NgModule({
  declarations: [
    AppComponent,
    ListEmployeeComponent,
    AddEditEmployeeComponent,
    LoginEmployeeComponent,
    MaskedInputDirective,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    SharedModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    AppRoutingModule,
    JwtModule.forRoot({
      jwtOptionsProvider: {
        provide: JWT_OPTIONS,
        useFactory: jwtOptionsFactory,
      },
    }),
  ],
  providers: [
    GlobalAuthGuard,
    AuthGuardService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

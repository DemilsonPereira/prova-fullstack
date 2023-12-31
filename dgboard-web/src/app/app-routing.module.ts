import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginEmployeeComponent } from './components/login-employee/login-employee.component';
import { ListEmployeeComponent } from './components/list-employee/list-employee.component';
import { AuthGuardService } from './auth-guard.service';
import { GlobalAuthGuard } from './global-auth.guard';


const routes: Routes = [
  {
    path: '',
    component: LoginEmployeeComponent,
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'home',
    canActivate: [GlobalAuthGuard, AuthGuardService],
    component: ListEmployeeComponent,
  },
  {
    path: '**',
    component: LoginEmployeeComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  AuthService,
  IUserCredential,
} from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-login-employee',
  templateUrl: './login-employee.component.html',
  styleUrls: ['./login-employee.component.css'],
})
export class LoginEmployeeComponent {
  formGroup: FormGroup = new FormGroup({
    cpf: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  loginObj: IUserCredential = {
    cpf: '',
    password: '',
  };

  constructor(private authService: AuthService) {}

  onLogin() {
    this.authService.authenticate(this.loginObj);
  }

  ngOnInit() {}
}

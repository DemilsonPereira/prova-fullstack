import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Employee } from '../interfaces/employee';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private myAppUrl: string;
  private myApiUrl: string;

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = 'api/users';
  }

  getEmployee(): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.myAppUrl}${this.myApiUrl}`);
  }

  deleteEmployee(id: string): Observable<void> {
    return this.http.delete<void>(`${this.myAppUrl}${this.myApiUrl}/${id}`);
  }

  addEmployee(employee: Employee): Observable<Employee> {
    return this.http.post<Employee>(
      `${this.myAppUrl}${this.myApiUrl}`,
      employee
    );
  }

  getEmployeeById(id: string): Observable<Employee> {
    return this.http.get<Employee>(`${this.myAppUrl}${this.myApiUrl}/${id}`);
  }

  updateEmployee(id: string, employee: Employee): Observable<void> {
    return this.http.put<void>(
      `${this.myAppUrl}${this.myApiUrl}/${id}`,
      employee
    );
  }
}

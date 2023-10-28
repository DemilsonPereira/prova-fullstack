import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Employee } from 'src/app/interfaces/employee';
import { Position } from 'src/app/interfaces/position';
import { Sector } from 'src/app/interfaces/sector';
import { DropdownService } from 'src/app/services/dropdown.service';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-add-edit-employee',
  templateUrl: './add-edit-employee.component.html',
  styleUrls: ['./add-edit-employee.component.css'],
})
export class AddEditEmployeeComponent {
  listPosition: Position[] = [];
  listSector: Sector[] = [];

  loading: boolean = false;
  operation: string = 'Cadastrar ';
  id: string | undefined;

  form: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AddEditEmployeeComponent>,
    private dropdownService: DropdownService,
    private fb: FormBuilder,
    private _employeeService: EmployeeService,
    private _snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      cpf: ['', Validators.required],
      position_id: ['', Validators.required],
      sector_id: ['', Validators.required],
    });

    this.id = data.id;
  }

  ngOnInit() {
    this.dropdownService.getListPosition().subscribe((data) => {
      this.listPosition = data;
    });

    this.dropdownService.getListSector().subscribe((data) => {
      this.listSector = data;
    });

    this.esEdit(this.id);
  }

  esEdit(id: string | undefined) {
    if (id !== undefined) {
      this.operation = 'Editar ';
      this.getEmployee(id);
    }
  }

  getEmployee(id: string) {
    this._employeeService.getEmployeeById(id).subscribe((data) => {
      this.form.patchValue({
        name: data.name,
        cpf: data.cpf,
        position_id: data.position_id,
        sector_id: data.sector_id,
      });
    });
  }

  cancelar() {
    this.dialogRef.close(false);
  }

  addEditEmployee() {
    if (this.form.invalid) {
      return;
    }

    const employee: Employee = {
      name: this.form.value.name,
      cpf: this.form.value.cpf,
      position_id: this.form.value.position_id,
      sector_id: this.form.value.sector_id,
    };

    this.loading = true;

    if (this.id === undefined) {
      this._employeeService.addEmployee(employee).subscribe(() => {
        this.successMessage('cadastrado');
      });
    } else {
      this._employeeService.updateEmployee(this.id, employee).subscribe(() => {
        this.successMessage('atualizado');
      });
    }
    this.loading = true;
    this.dialogRef.close(true);
  }

  successMessage(operation: string) {
    this._snackBar.open(`Funcionário ${operation} com sucesso!`, '', {
      duration: 2000,
    });
  }
}

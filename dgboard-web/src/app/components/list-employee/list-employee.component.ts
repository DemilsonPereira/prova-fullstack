import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Employee } from 'src/app/interfaces/employee';
import { AddEditEmployeeComponent } from '../add-edit-employee/add-edit-employee.component';
import { EmployeeService } from 'src/app/services/employee.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-list-employee',
  templateUrl: './list-employee.component.html',
  styleUrls: ['./list-employee.component.css'],
})
export class ListEmployeeComponent implements AfterViewInit {
  displayedColumns: string[] = ['name', 'cpf', 'position', 'sector', 'acoes'];

  dataSource = new MatTableDataSource<Employee>();

  loading: boolean = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private dialog: MatDialog,
    private customPaginatorIntl: MatPaginatorIntl,
    private _liveAnnouncer: LiveAnnouncer,
    private _employeeService: EmployeeService,
    private _snackBar: MatSnackBar,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.listEmployee();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.customPaginatorIntl.itemsPerPageLabel = 'Funcionário por página';
    this.customPaginatorIntl.nextPageLabel = 'Próxima Página';
    this.customPaginatorIntl.previousPageLabel = 'Página Anterior';
    this.customPaginatorIntl.firstPageLabel = 'Primeira Página';
    this.customPaginatorIntl.lastPageLabel = 'Última Página';
    this.paginator._intl = this.customPaginatorIntl;
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  sectorFilterValue: string = '';

  applySectorFilter(event: Event) {
    this.sectorFilterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = this.sectorFilterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  positionFilterValue: string = '';

  applyPositionFilter(event: Event) {
    this.positionFilterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = this.positionFilterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openAddEditEmployee(id?: string) {
    const dialogRef = this.dialog.open(AddEditEmployeeComponent, {
      width: '650px',
      disableClose: true,
      data: { id: id },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) this.listEmployee();
    });
  }

  listEmployee() {
    this.loading = true;
    this._employeeService.getEmployee().subscribe((data) => {
      this.loading = false;
      this.dataSource.data = data;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  createEmployee() {}

  deleteEmployee(id: string) {
    this.loading = true;
    this._employeeService.deleteEmployee(id).subscribe((data) => {
      this.listEmployee();
      this.successMessage();
    });
  }

  successMessage() {
    this._snackBar.open('Funcionário excluído com sucesso!', '', {
      duration: 2000,
    });
  }

  onButtonLogout() {
    this.authService.logout();
  }
}

import { Injectable } from '@angular/core';
import { Sector } from 'src/app/interfaces/sector';
import { Position } from 'src/app/interfaces/position';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DropdownService {
  private myAppUrl: string;
  private positionUrl: string;
  private sectorUrl: string;

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint;
    this.positionUrl = 'api/positions';
    this.sectorUrl = 'api/sectors';
  }

  getListPosition(): Observable<Position[]> {
    return this.http.get<Position[]>(`${this.myAppUrl}${this.positionUrl}`);
  }

  getListSector(): Observable<Sector[]> {
    return this.http.get<Sector[]>(`${this.myAppUrl}${this.sectorUrl}`);
  }
}

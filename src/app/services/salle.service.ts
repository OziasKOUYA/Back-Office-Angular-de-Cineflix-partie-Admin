import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Salle } from '../models/salle';
import { UrlHandlingStrategy } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class SalleService {
  private apiUrl = 'http://127.0.0.1:8000/api/v1/salle/';

  constructor(private http: HttpClient) { }

  getAllsalle(): Observable<Array<Salle>>{
    const url= `${this.apiUrl}`;
    return this.http.get<Array<Salle>>(url);
  }

  add(salle: Salle): Observable<Salle> {
    const url= `${this.apiUrl}`;
    return this.http.post<Salle>(url, salle);
  }

  update(id:number,salle: Salle): Observable<Salle> {
    const url = `${this.apiUrl}${id}/`;
    return this.http.put<Salle>(url, salle);
  }

  delete(id: number): Observable<void> {
    const url = `${this.apiUrl}${id}/`;
    return this.http.delete<void>(url);
  }

  getSalle(id: number): Observable<Salle> {
    const url = `${this.apiUrl}${id}/`;
    return this.http.get<Salle>(url);
  }
}

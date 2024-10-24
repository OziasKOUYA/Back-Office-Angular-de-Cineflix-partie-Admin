import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Projection } from '../models/projection';


@Injectable({
  providedIn: 'root'
})
export class ProjectionService {
  private apiUrl = 'http://127.0.0.1:8000/api/v1/';

  constructor(private http: HttpClient) { }

  getSalles(): Observable<any> {
    return this.http.get(`${this.apiUrl}salle/`);
  }

  getFilm(): Observable<any> {
    return this.http.get(`${this.apiUrl}film/`);
  }

  getUneSalle(id:number): Observable<any> {
    return this.http.get(`${this.apiUrl}salle/${id}/`);
  }

  getUnFilm(id:number): Observable<any> {
    return this.http.get(`${this.apiUrl}film/${id}/`);
  }

  getAll(): Observable<Projection[]> {
    const url = `${this.apiUrl}projection/`;
    return this.http.get<Projection[]>(url);
  }

  add(projection: Projection): Observable<any> {
    const url=`${this.apiUrl}projection/`;
    return this.http.post<Projection>(url, projection);
  }

  update(id:number,projection:Projection): Observable<Projection>{
    const url=`${this.apiUrl}projection/${id}/`;
    return this.http.put<Projection>(url,projection);
  }

  delete(id:number): Observable<void>{
    const url=`${this.apiUrl}projection/${id}/`;
    return this.http.delete<void>(url)
  }

  getProjection(id:number): Observable<Projection>{
    const url=`${this.apiUrl}projection/${id}`;
    return this.http.get<Projection>(url);
  }
}

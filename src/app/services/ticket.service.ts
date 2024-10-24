import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Ticket } from '../models/ticket';
import {Projection} from "../models/projection";


@Injectable({
  providedIn: 'root'
})
export class TicketService {
  private apiUrl = 'http://127.0.0.1:8000/api/v1/';

  constructor(private http: HttpClient) { }

  getProjection(): Observable<any> {
    return this.http.get(`${this.apiUrl}projection/`);
  }

  getAll(): Observable<Ticket[]> {
    const url = `${this.apiUrl}ticket/`;
    return this.http.get<Ticket[]>(url);
  }

  add(ticket: Ticket): Observable<any> {
    const url=`${this.apiUrl}ticket/`;
    return this.http.post<Ticket>(url, ticket);
  }

  update(id:number,ticket:Ticket): Observable<Ticket>{
    const url=`${this.apiUrl}ticket/${id}/`;
    return this.http.put<Ticket>(url,ticket);
  }

  delete(id:number): Observable<void>{
    const url=`${this.apiUrl}ticket/${id}/`;
    return this.http.delete<void>(url)
  }


  getUneProjection(id:number): Observable<any> {
    return this.http.get(`${this.apiUrl}projection/${id}/`);
  }
}

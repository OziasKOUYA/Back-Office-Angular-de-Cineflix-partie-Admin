import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Film } from '../models/film';
import { UrlHandlingStrategy } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class FilmService {
  private apiUrl = 'http://127.0.0.1:8000/api/v1/film/';

  constructor(private http: HttpClient) { }

  getAllfilm(): Observable<Array<Film>>{
    const url= `${this.apiUrl}`;
    return this.http.get<Array<Film>>(url);
  }

  add(film: Film, imageFile: File): Observable<Film>{
    const url= `${this.apiUrl}`;
    const formData: FormData = new FormData();
    formData.append('titre', film.titre);
    formData.append('description', film.description);
    formData.append('acteur_principal', film.acteur_principal);
    formData.append('duree', film.duree);
    if (imageFile) {
      formData.append('affiche', imageFile, imageFile.name);
    }
    return this.http.post<Film>(url, formData);
  }

  update(id:number,film: Film,imageFile: File): Observable<Film> {
    const url = `${this.apiUrl}${id}/`;
    const formData: FormData = new FormData();
    formData.append('titre', film.titre);
    formData.append('description', film.description);
    formData.append('acteur_principal', film.acteur_principal);
    formData.append('duree', film.duree);
    if (imageFile) {
      formData.append('affiche', imageFile, imageFile.name);
    }
    return this.http.put<Film>(url, formData);
  }


  delete(id: number): Observable<void> {
    const url = `${this.apiUrl}${id}/`;
    return this.http.delete<void>(url);
  }

  getFilm(id: number): Observable<Film> {
    const url = `${this.apiUrl}${id}/`;
    return this.http.get<Film>(url);
  }


}

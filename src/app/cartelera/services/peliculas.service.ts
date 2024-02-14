import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { consultaPeliculas } from '../interfaces/pelicula';
import { API_HEADERS, URL_API } from 'src/app/environments/environment';

@Injectable({ providedIn: 'root' })
export class PeliculasService {
  constructor(private http: HttpClient) {}

  getGeneros(): Observable<any> {
    return this.http.get<any>(
      `${URL_API}genre/movie/list?language=es-ES`,
      API_HEADERS
    );
  }

  getPortada(): Observable<consultaPeliculas> {
    return this.http.get<consultaPeliculas>(
      `${URL_API}trending/movie/week?language=es-ES&page=1`,
      API_HEADERS
    );
  }
  getPeliculas(generoId: number): Observable<any> {
    return this.http.get<any>(
      `${URL_API}discover/movie?with_genres=${generoId}&language=es-ES`,
      API_HEADERS
    );
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { URL_API_SGI } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  doLogin(data: any): Observable<any> {
    return this.http.post(`${URL_API_SGI}/login.php`, data);
  }

  logout(): Observable<any> {
    return this.http.post(`${URL_API_SGI}/logout.php`, {});
  }

  isAuthenticated(): Observable<boolean> {
    const id_usuario = localStorage.getItem('id_usuario');
    const id_rol = localStorage.getItem('id_rol');
    const nombre_publico = localStorage.getItem('nombre_publico');
    const token = localStorage.getItem('token');

    if (!id_usuario || !id_rol || !nombre_publico || !token) {
      return of(false)
    }
    return of(true);
  }

  canSee(): Observable<boolean> {
    const id_rol = localStorage.getItem('id_rol');
    if(!id_rol || id_rol != '1') {
      return of(false)
    }
    return of(true)
  }
}

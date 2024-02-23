import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { URL_API_SGI } from 'src/environments/environment';
import { ApiResponse } from '../interfaces/api-response';
import { CommonService } from '../commonService';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private commonService: CommonService) {}

  doLogin(data: any): Observable<any> {
    return this.http.post(`${URL_API_SGI}/login.php`, data);
  }

  logout(): Observable<any> {
    return this.http.post(`${URL_API_SGI}/logout.php`, {});
  }

  public async isAuthenticated(url: string): Promise<boolean> {
    let rutaSeleccionada: string;
    const promise = new Promise<boolean>((resolve, reject) => {
      rutaSeleccionada = url.substring(1);
      rutaSeleccionada = rutaSeleccionada.split('/')[0];

      this.http
        .get<ApiResponse>(
          `${URL_API_SGI}/check_usuarios.php?ruta=${rutaSeleccionada}`,
          { headers: this.commonService.getHeaders() }
        )
        .subscribe((response: ApiResponse) => {
          console.log(response);
          resolve(response.ok);
        });
    });
    return promise;
  }

  public async areLoged(): Promise<boolean> {
    const promise = new Promise<boolean>((resolve, reject) => {
      this.http
        .get<ApiResponse>(`${URL_API_SGI}/check_usuarios.php?ruta=inicio`, {
          headers: this.commonService.getHeaders(),
        })
        .subscribe((response: ApiResponse) => {
          console.log(response);
          resolve(response.ok);
        });
    });
    return promise;
  }

  canSee(): Observable<boolean> {
    const id_rol = localStorage.getItem('id_rol');
    if (!id_rol || id_rol != '1') {
      return of(false);
    }
    return of(true);
  }
}

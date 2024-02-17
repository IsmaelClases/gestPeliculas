import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
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
    return this.http.get<boolean>(`${URL_API_SGI}/check_authentication.php`);
  }
}

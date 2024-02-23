import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateFn,
  CanMatchFn,
  Route,
  Router,
  RouterStateSnapshot,
  UrlSegment,
} from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Injectable, inject } from '@angular/core';
import { Observable, map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class areLogedMatchGuard implements CanActivate {
  constructor(public auth: AuthService, public router: Router) {}

  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> {
    const response = await this.auth.areLoged();
    if (response) {
      this.router.navigate(['/inicio']);
    }
    return true;
  }
}

import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  CanMatchFn,
  Route,
  Router,
  RouterStateSnapshot,
  UrlSegment,
} from '@angular/router';
import { Observable, map, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';

const checkLoged = (): Observable<boolean> => {
  const authService: AuthService = inject(AuthService);
  const router: Router = inject(Router);

  return authService.isAuthenticated().pipe(
    tap((areLoged) => {
      if (areLoged) {
        router.navigate(['/inicio']);
      }
    }),
    map(() => true)
  );
};

export const areLogedMatchGuard: CanMatchFn = (
  router: Route,
  segment: UrlSegment[]
) => {
  return checkLoged();
};

export const areLogedActivatedGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  return checkLoged();
};

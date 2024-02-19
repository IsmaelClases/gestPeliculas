import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  CanMatchFn,
  Route,
  Router,
  RouterStateSnapshot,
  UrlSegment,
} from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';

const checkPermises = (): Observable<boolean> => {
  const authService: AuthService = inject(AuthService);
  const router: Router = inject(Router);

  return authService.canSee().pipe(
    tap((canSee) => {
      if (!canSee) {
        router.navigate(['../404']);
      }
    })
  );
};

export const canSeeMatchGuard: CanMatchFn = (
  router: Route,
  segment: UrlSegment[]
) => {
  return checkPermises();
};

export const canSeeActivatedGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  return checkPermises();
};

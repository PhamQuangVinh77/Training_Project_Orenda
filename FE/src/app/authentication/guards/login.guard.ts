import { ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { inject } from '@angular/core';
import { UserService } from '../../services/user.service';

export const LoginGuard:
  CanActivateFn = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> => {
    let service = inject(UserService);
    let result = service.checkToken();
    return of(result);
  };


import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { ConstData } from '../../Dto/ConstData';

export const loginGuard: 
  CanActivateFn = (
    route: ActivatedRouteSnapshot, 
    state: RouterStateSnapshot
  ) : Observable<boolean>=>{ 
    let router : Router = new Router();
    let key = ConstData.ACCESSTOKEN;
    let token = localStorage.getItem(key);
    if(!token){
      router.navigate(['/login']);
      return of(false); 
    }
    return of(true); 
  };

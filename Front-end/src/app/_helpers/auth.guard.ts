import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { StorageService } from '../_services/storage.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private token: StorageService
    ) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const user = this.token.getUser();

        if (user) {
            let n = (Math.floor((new Date).getTime() / 1000)) ;
            let d = new Date(user.expires);
            let e = (Math.floor((d).getTime() / 1000)) ;
            // authorised so return true
            let ex = n - e;
            if(ex <= 0){
                return true;
            }               
        }
        this.token.signOut();
        // not logged in so redirect to login page with the return url
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
        return false;
    }
}
import { AuthenticateService } from "./../services/authenticate.service";
import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private authenticateService: AuthenticateService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const currentUserRole = this.authenticateService.currentUserRoleSubject.value;
        if (currentUserRole) {
            // check if route is restricted by role
            if (route.data.roles && route.data.roles.indexOf(currentUserRole) === -1) {
                // role not authorised so redirect to dashboard
                this.router.navigate(['/dashboard']);
                return false;
            }

            // authorised so return true
            return true;
        }

        // not logged in so redirect to login page with the return url
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
        return false;
    }
}
import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {JwtHelperService} from '@auth0/angular-jwt';
import {AuthenticationService} from '../_services/authentication.service';
import {Enums} from '../_models/enums';
import {forEach} from '@angular-devkit/schematics';
import {ToastService} from '../_services/toast.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    jwtHelper: JwtHelperService = new JwtHelperService();

    constructor(
        private router: Router,
        private authenticationService: AuthenticationService,
        private toastService: ToastService
    ) {
    }

    private previousUrl: string;
    private currentUrl: string;

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

        const currentUser = this.authenticationService.getUser();

        if (currentUser) {

            const found = next.data.roles.some(r => this.authenticationService.getUserRoles().indexOf(r) >= 0);

            if (!found) {
                this.toastService.presentAuthToast('You are not allowed!');
                return false;
            }

            if (!this.isAuthenticated()) {
                this.toastService.presentAuthToast("Session expired!")
                this.router.navigate(['/login'], {queryParams: {returnUrl: state.url}});
                return false;
            }
            return true;
        } else {
            this.toastService.presentAuthToast("Login first!");
            this.router.navigate(['/login']);
            return false;
        }
    }

    isAuthenticated(): boolean {

        const currentUser = this.authenticationService.getUser();

        if (!currentUser) {
            return false;
        }

        return !this.jwtHelper.isTokenExpired(currentUser.token);
    }

}

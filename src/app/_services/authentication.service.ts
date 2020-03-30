import {Injectable} from '@angular/core';
import {HttpService} from './http.service';
import {LoginDTO} from '../_models/dto/dtoEntities';
import {Enums} from '../_models/enums';
import {CurrentUser} from '../_models/entities';
import {Router} from '@angular/router';
import {ToastService} from './toast.service';
import {JwtHelperService} from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private router: Router, private toastService: ToastService) { }

  private jwtHelper: JwtHelperService = new JwtHelperService();


  logout() {
    localStorage.removeItem('currentUser');
    this.router.navigate(['/login']); // Param mit Logout dann snackbar beim Login erfogreich ausgelogget!
  }

  setUser(user: CurrentUser) {
    localStorage.setItem('currentUser', JSON.stringify(user));
  }

  getUser(): CurrentUser {
    return JSON.parse(localStorage.getItem('currentUser'));
  }

  getUserRoles() {
    return this.jwtHelper.decodeToken(this.getUser().token).role
        .replace('[', '')
        .replace(']', '')
        .split(', ');
  }
}

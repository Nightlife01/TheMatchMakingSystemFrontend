import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/user.model';
import { HttpClient } from '@angular/common/http';
import { UserLogin } from '../models/user-login.model';
import { Role } from '../models/role.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {
  isLoggedin = new BehaviorSubject(localStorage.getItem('token') ? true : false);
  //hasRole = new BehaviorSubject(localStorage.getItem('role') ? true : false);
  //public huidigeGebruiker: Observable<User>;
  currentUserRoleSubject: BehaviorSubject<string>;
  //currentUserRole: Observable<string>;

  constructor(private httpClient: HttpClient, private _router: Router) {
    this.currentUserRoleSubject = new BehaviorSubject(localStorage.getItem('role'));
    // this.currentUserRole = this.currentUserRoleSubject.asObservable();
  }

  logout() {
    // remove user and userrole from local storage and set current user and userrole to null
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    this.isLoggedin = new BehaviorSubject(localStorage.getItem('token') ? true : false);
    // this.hasRole = new BehaviorSubject(localStorage.getItem('role') ? true : false);
    this.currentUserRoleSubject.next(null);
  }

  authenticate(userLogin: UserLogin): Observable<User> {
    return this.httpClient.post<User>("https://localhost:5001/api/User/login", userLogin);
  }

  isLoggedIn() {
    if (localStorage.getItem('token')) {
      return true;
    } else {
      return false;
    }
  }
}

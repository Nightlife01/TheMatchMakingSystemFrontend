// @ts-ignore
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Assignment } from '../models/assignment.model';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class GebruikerService {

  constructor(private http: HttpClient) {
  }

  // moet nog gemaakt worden in de API
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>('https://localhost:5001/api/User/');
  }
  
  getAdmins(): Observable<User[]> {
    return this.http.get<User[]>('https://localhost:5001/api/User/admins');
  }

  getUnassignedUsers(): Observable<User[]> {
    return this.http.get<User[]>('https://localhost:5001/api/User/unassigned/');
  }

  getCurrentUser() : Observable<User>{
    return this.http.get<User>('https://localhost:5001/api/User/myUser');
  }

  createUser(user: User) {
    return this.http.post('https://localhost:5001/api/User/register', user)
  }

  getUserRoles() {
    return this.http.get('https://localhost:5001/api/Role');
  }

  updateGebruiker(oldPassword: string, user: User) {
    return this.http.put<User>("https://localhost:5001/api/User/", { oldPassword : oldPassword, user : user});
  }

  deleteUser(userID: number){
    return this.http.delete("https://localhost:5001/api/User/" + userID);
  }

  //ingelogde gebruiker ID opvragen
  getCurrentGebruiker() {
    if (localStorage.getItem('token') != null) {
      let jwtData = localStorage.getItem("token").split('.')[1];
      let decodedJwt = window.atob(jwtData);
      console.log(JSON.parse(decodedJwt));
      return JSON.parse(decodedJwt);
    }
    return null;
  }

  // getUsers(): Observable<User[]> {
  //   return this.http.get<User[]>('https://localhost:5001/api/Assignment');
  // }
  //
  // getUser(userID: number) {
  //   return this.http.get<User>('https://localhost:5001/api/Assignment/' + assignmentID);
  // }

  controleerActivatieGebruiker(activationcode: any) {
    return this.http.post<any>("https://localhost:5001/api/user/confirmEmail/" + activationcode, null);
  }
}

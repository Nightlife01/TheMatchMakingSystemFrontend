import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Assignment } from '../models/assignment.model';
import { Maker } from '../models/maker.model';
import { Review } from '../models/review.model';

@Injectable({
  providedIn: 'root'
})
export class OpdrachtService {


  selectedCompany = new BehaviorSubject(null);

  constructor(private http: HttpClient) {
  }

  getAssignments(): Observable<Assignment[]> {
    return this.http.get<Assignment[]>('https://localhost:5001/api/Assignment');
  }

  getAssignmentRequests(userID: number): Observable<Assignment[]> {
    return this.http.get<Assignment[]>('https://localhost:5001/api/Assignment/AssignmentsRequests/' + userID);
  }

  getAcceptedAssignments(userID: number): Observable<Assignment[]> {
    return this.http.get<Assignment[]>('https://localhost:5001/api/Assignment/getAcceptedAssignments/' + userID);
  }

  getAssignment(assignmentID: number) {
    return this.http.get<Assignment>('https://localhost:5001/api/Assignment/' + assignmentID);
  }

  getUnassignedAssignmentsByCompanyID(companyID: number): Observable<Assignment[]> {
    return this.http.get<Assignment[]>('https://localhost:5001/api/Assignment/Unassigned/' + companyID);
  }

  addAssignment(assignment: Assignment) {
    return this.http.post<Assignment>('https://localhost:5001/api/Assignment/', assignment);
  }

  addAssignmentRequest(assignmentID: number, makerID: number) {
    return this.http.post('https://localhost:5001/api/AssignmentRequest/', {
      AssignmentRequestID: 0,
      AssignmentID: assignmentID,
      MakerID: makerID
    });
  }

  updateAssignment(assignmentID: number, assignment: Assignment) {
    return this.http.put('https://localhost:5001/api/Assignment/' + assignmentID, assignment);
  }

  updatePostAssignment(assignmentID: number, makerID: number) {
    return this.http.post('https://localhost:5001/api/Assignment/updatePostAssignment/' + assignmentID +'/' + makerID,null);
  }

  updateAssignmentAndSendMails(assignmentID: number, assignment: Assignment) {
    return this.http.put<any>('https://localhost:5001/api/Assignment/updateAndSendMails/' + assignmentID, assignment);
  }

  deleteAssignment(assignmentID: number) {
    return this.http.delete<Assignment>('https://localhost:5001/api/Assignment/' + assignmentID);
  }

  deleteAssignmentRequest(userID: number, assignmentID: number) {
    return this.http.delete<Assignment>('https://localhost:5001/api/AssignmentRequest/' + userID + '/' + assignmentID);
  }
}

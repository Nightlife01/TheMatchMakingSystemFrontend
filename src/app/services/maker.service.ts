// @ts-ignore
import {Injectable} from '@angular/core';
// @ts-ignore
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Assignment} from '../models/assignment.model';
import {Maker} from '../models/maker.model';
import {Tag} from '../models/tag.model';
import {Review} from '../models/review.model';
import {Company} from '../models/company.model';

@Injectable({
  providedIn: 'root'
})
export class MakerService {

  constructor(private http: HttpClient) {
  }

  getMakers(): Observable<Maker[]> {
    return this.http.get<Maker[]>('https://localhost:5001/api/Maker');
  }

  getMaker(makerID: number) {
    return this.http.get<Maker>('https://localhost:5001/api/Maker/' + makerID);
  }

  getTagsByMakerID(makerID: number) {
    return this.http.get<Tag[]>('https://localhost:5001/api/Tag/byMakerID/' + makerID);
  }

  getInterestedMakersByAssignmentID(assignmentID: number): Observable<Maker[]> {
    return this.http.get<Maker[]>('https://localhost:5001/api/Maker/InterestedMakersByAssignmentID/' + assignmentID);
  }

  getMakerByUserID(userID: number): Observable<Maker> {
    return this.http.get<Maker>('https://localhost:5001/api/Maker/byUserID/' + userID);
  }

  getMyMaker(): Observable<Maker> {
    return this.http.get<Maker>('https://localhost:5001/api/Maker/myMaker');
  }  

  addMaker(maker: Maker) {
    return this.http.post<Maker>('https://localhost:5001/api/Maker/', maker);
  }

  updateMaker(makerID: number, maker: Maker) {
    return this.http.put<Maker>('https://localhost:5001/api/Maker/' + makerID, maker);
  }

  deleteMaker(makerID: number) {
    return this.http.delete<Maker>('https://localhost:5001/api/Maker/' + makerID);
  }
}

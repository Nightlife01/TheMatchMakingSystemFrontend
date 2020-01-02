// @ts-ignore
import {Injectable} from '@angular/core';
// @ts-ignore
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {MakerType} from '../models/makerType';

@Injectable({
  providedIn: 'root'
})
export class MakerTypeService {

  constructor(private http: HttpClient) {
  }

  getMakerTypes(): Observable<MakerType[]> {
    return this.http.get<MakerType[]>('https://localhost:5001/api/MakerType');
  }
}

import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Assignment} from '../models/assignment.model';
import {Company} from '../models/company.model';
import {Tag} from '../models/tag.model';
import {Maker} from '../models/maker.model';

@Injectable({
  providedIn: 'root'
})
export class BedrijfService {

  constructor(private http: HttpClient) {
  }

  getCompanies(): Observable<Company[]> {
    return this.http.get<Company[]>('https://localhost:5001/api/Company');
  }

  getCompany(companyID: number) {
    return this.http.get<Company>('https://localhost:5001/api/Company/' + companyID);
  }

  getCompanyByUserID(userID: number) : Observable<Company>{
    return this.http.get<Company>('https://localhost:5001/api/Company/byUserID/' + userID);
  }

  getTagsByCompanyID(bedrijfID: number) {
    return this.http.get<Tag[]>('https://localhost:5001/api/Tag/byCompanyID/' + bedrijfID);
  }

  getMyCompany(): Observable<Company> {
    return this.http.get<Company>('https://localhost:5001/api/Company/myCompany/');
  }

  addCompany(company: Company) {
    return this.http.post('https://localhost:5001/api/Company/', company);
  }

  updateCompany(companyID: number, company: Company) {
    return this.http.put<Company>('https://localhost:5001/api/Company/' + companyID, company);
  }

  deleteCompany(companyID: number) {
    return this.http.delete<Company>('https://localhost:5001/api/Company/' + companyID);
  }
}

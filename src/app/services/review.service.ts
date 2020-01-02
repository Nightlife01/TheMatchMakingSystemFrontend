// @ts-ignore
import {Injectable} from '@angular/core';
// @ts-ignore
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Assignment} from '../models/assignment.model';
import {Review} from '../models/review.model';
import {Maker} from '../models/maker.model';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  constructor(private http: HttpClient) {
  }

  getReviews(): Observable<Review[]> {
    return this.http.get<Review[]>('https://localhost:5001/api/Reviews');
  }

  getReview(reviewID: number) {
    return this.http.get<Review>('https://localhost:5001/api/Reviews/' + reviewID);
  }

  getMyReviewsAsReceiver(){
    return this.http.get<Review[]>('https://localhost:5001/api/Reviews/byUserID');
  }

  getReviewsByMakerID(makerID: number) {
    return this.http.get<Review[]>('https://localhost:5001/api/Reviews/byMakerID/' + makerID);
  }

  getReviewsByCompanyID(companyID: number) {
    return this.http.get<Review[]>('https://localhost:5001/api/Reviews/ByCompanyID/' + companyID);
  }

  addReview(review :Review){
    return this.http.post('https://localhost:5001/api/Reviews' ,review);
  }

  updateReview(reviewID: number, review: Review) {
    return this.http.put<Review>('https://localhost:5001/api/Reviews/' + reviewID, review);
  }

  deleteReview(reviewID: number) {
    return this.http.delete<Review>('https://localhost:5001/api/Reviews/' + reviewID);
  }
}

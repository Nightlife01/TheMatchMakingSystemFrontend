import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Review} from '../../models/review.model';
import {ReviewService} from '../../services/review.service';
import {MakerService} from '../../services/maker.service';

@Component({
  selector: 'app-bedrijf-review',
  templateUrl: './bedrijf-review.component.html',
  styleUrls: ['./bedrijf-review.component.scss']
})
export class BedrijfReviewComponent implements OnInit {

  public reviews: any;
  public companyID: number;
  selectedReviewerID : number = null;

  constructor(private _reviewService: ReviewService, private makerService : MakerService) {
    this._reviewService.getMyReviewsAsReceiver().subscribe(res=> this.reviews = res);
  }

  ngOnInit() {
  }

  showReviewer(reviewerID: any) {
    this.makerService.getMakerByUserID(reviewerID).subscribe(res=>this.selectedReviewerID = res.makerID);
  }

  close() {
    this.selectedReviewerID = null;
  }
}

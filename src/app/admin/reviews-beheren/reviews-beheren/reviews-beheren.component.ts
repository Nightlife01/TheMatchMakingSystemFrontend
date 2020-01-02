import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Review} from '../../../models/review.model';
import {ReviewService} from '../../../services/review.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-reviews-beheren',
  templateUrl: './reviews-beheren.component.html',
  styleUrls: ['./reviews-beheren.component.scss']
})
export class ReviewsBeherenComponent implements OnInit {

  submitted: boolean = false;
  errorBool: boolean = false;
  errorMessage: string = '';

  reviewForm: FormGroup;
  review: Review;
  reviewID: number;

  reviews: Observable<Review[]>;

  constructor(private _reviewService: ReviewService) {
    this.reviewForm = new FormGroup({
      reviewerID: new FormControl(''),
      receiverID: new FormControl(''),
      assignmentID: new FormControl(''),
      description: new FormControl(''),
      like: new FormControl('')
    });

    this.reviews = _reviewService.getReviews();
  }

  onClickBewerkReview(gekozenReview: Review) {
    this.review = gekozenReview;
    this.reviewForm.patchValue(gekozenReview);

    this.reviewForm.controls['like'].setValue(gekozenReview.like, {onlySelf: true});
  }

  onSubmit() {
    const form = this.reviewForm.value;
    this.review = new Review(this.review.reviewID, form.reviewerID, form.receiverID, form.assignmentID, form.description, form.like);

    this._reviewService.updateReview(this.review.reviewID, this.review).subscribe(result => {
      this.submitted = true;
      window.location.reload();
    }, error => {
      this.submitted = false;
      this.errorBool = true;
      this.errorMessage = 'Er is iets misgegaan bij het wijzigen.';
    });
  }

  onCLickVerwijderReview(gekozenReviewID: number) {
    this._reviewService.deleteReview(gekozenReviewID).subscribe();
    window.location.reload();
  }

  ngOnInit() {
  }

}

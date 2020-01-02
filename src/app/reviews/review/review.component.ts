import {Component, OnInit, Input} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { ReviewService } from 'src/app/services/review.service';
import { Review } from 'src/app/models/review.model';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss']
})
export class ReviewComponent implements OnInit {

  @Input() companyID: number;
  @Input() assignmentID: number;
  @Input() currentUID: number;

  reviewForm: FormGroup;
  errorBool: boolean = false;
  submitted: boolean = false;
  errorMessage: string = '';
  review : Review;

  constructor(private _reviewService : ReviewService) {
    this.reviewForm = new FormGroup({
      description: new FormControl('', {validators: [Validators.required]}),
      like: new FormControl('')
    });
  }

  ngOnInit() {
    console.log("RECEIVER: "+this.companyID);
    console.log("ASSIGNMENTID: "+this.assignmentID);
    console.log("REVIEWER: "+this.currentUID);
  }

  onSubmit() {
    const form = this.reviewForm.value;
    this.submitted = true;
    this.review = new Review(0,this.currentUID,this.companyID,this.assignmentID,form.description,form.like)

    this._reviewService.addReview(this.review).subscribe();
  }

}

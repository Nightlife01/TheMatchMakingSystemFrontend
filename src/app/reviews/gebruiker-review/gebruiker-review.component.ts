import {Component, OnInit} from '@angular/core';
import {ReviewService} from '../../services/review.service';
import {Observable} from 'rxjs';
import {Review} from '../../models/review.model';
import { GebruikerService } from 'src/app/services/gebruiker.service';
import { BedrijfService } from 'src/app/services/bedrijf.service';

@Component({
  selector: 'app-gebruiker-review',
  templateUrl: './gebruiker-review.component.html',
  styleUrls: ['./gebruiker-review.component.scss']
})
export class GebruikerReviewComponent implements OnInit {

  public reviews: any;
  public userID: number;
  selectedCompanyID : number = null;
  companyID : number = null;

  constructor(private _reviewService: ReviewService , private _gebruikerService : GebruikerService, private _bedrijfService : BedrijfService) {
   
  }

  ngOnInit() {
    this.selectedCompanyID = null;
    this.userID = this.getCurrentGebruiker().UserID;
    console.log("USERID: "+ this.userID)
    this._reviewService.getMyReviewsAsReceiver().subscribe(res=>this.reviews = res);
  }

  showReviewer(companyUserID : number){
    console.log("companyUserID"+companyUserID);

    this._bedrijfService.getCompanyByUserID(companyUserID).subscribe(res=> this.selectedCompanyID = res.companyID);
    console.log("companyID "+this.companyID);
    console.log("selectedCompanyID "+this.selectedCompanyID );
  }

  close(){
    this.selectedCompanyID = null;
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
}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReviewComponent } from './review/review.component';
import {ReactiveFormsModule} from '@angular/forms';
import { GebruikerReviewComponent } from './gebruiker-review/gebruiker-review.component';
import { BedrijfReviewComponent } from './bedrijf-review/bedrijf-review.component';
import { DashboardModule } from '../dashboard/dashboard.module';
import { GebruikerModule } from '../gebruiker/gebruiker.module';



@NgModule({
  declarations: [ReviewComponent, GebruikerReviewComponent, BedrijfReviewComponent],
  exports:[
    ReviewComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    GebruikerModule
  ]
})
export class ReviewsModule { }

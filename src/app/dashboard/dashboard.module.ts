import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { InzendingenComponent } from './inzendingen/inzendingen.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { GebruikerOpdrachtenComponent } from './gebruiker-opdrachten/gebruiker-opdrachten.component';
import { BedrijfOpdrachtenComponent } from './bedrijf-opdrachten/bedrijf-opdrachten.component';
import { FilterPipe } from './filter.pipe';
import {GebruikerModule} from '../gebruiker/gebruiker.module';
import { ReviewsModule } from '../reviews/reviews.module';



@NgModule({
  declarations: [DashboardComponent, HomeComponent,  InzendingenComponent, GebruikerOpdrachtenComponent, BedrijfOpdrachtenComponent, FilterPipe],
  imports: [
    CommonModule,
    FormsModule,
    GebruikerModule,
    ReviewsModule,
    ReactiveFormsModule
  ],
  exports:[]
})
export class DashboardModule { }

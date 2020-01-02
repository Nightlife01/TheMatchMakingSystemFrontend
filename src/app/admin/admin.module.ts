import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import {GebruikersBeherenComponent} from './gebruikers-beheren/gebruikers-beheren/gebruikers-beheren.component';
import {ReviewsBeherenComponent} from './reviews-beheren/reviews-beheren/reviews-beheren.component';
import {OpdrachtenBeherenComponent} from './opdrachten-beheren/opdrachten-beheren/opdrachten-beheren.component';
import {TagsBeherenComponent} from './tags-beheren/tags-beheren/tags-beheren.component';

@NgModule({
  declarations: [TagsBeherenComponent, GebruikersBeherenComponent, ReviewsBeherenComponent, OpdrachtenBeherenComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class AdminModule {
}

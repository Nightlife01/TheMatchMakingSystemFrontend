import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OpdrachtComponent } from './opdracht/opdracht.component';
import {ReactiveFormsModule} from '@angular/forms';



@NgModule({
  declarations: [OpdrachtComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ]
})
export class OpdrachtenModule { }

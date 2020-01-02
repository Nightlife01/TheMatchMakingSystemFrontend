import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegistrerenComponent } from './registreren/registreren.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { ProfielComponent } from './profiel/profiel.component';
import { BedrijfProfielComponent } from './bedrijf-profiel/bedrijf-profiel.component';
import { MakerProfielComponent } from './maker-profiel/maker-profiel.component';
import { AccountActivatieComponent } from './account-activatie/account-activatie.component';



@NgModule({
  declarations: [LoginComponent, RegistrerenComponent, ProfielComponent, BedrijfProfielComponent, MakerProfielComponent, AccountActivatieComponent],
  exports: [
    BedrijfProfielComponent,
    MakerProfielComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule
  ]
})
export class GebruikerModule { }

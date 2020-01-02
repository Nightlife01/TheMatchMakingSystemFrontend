import { Company } from './models/company.model';
// @ts-ignore
import { BrowserModule } from '@angular/platform-browser';
// @ts-ignore
import { NgModule } from '@angular/core';

// @ts-ignore
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// @ts-ignore
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './gebruiker/login/login.component';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';
import { HomeComponent } from './dashboard/home/home.component';
import { RegistrerenComponent } from './gebruiker/registreren/registreren.component';
import { ProfielComponent } from './gebruiker/profiel/profiel.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { GebruikerModule } from './gebruiker/gebruiker.module';
import { InzendingenComponent } from './dashboard/inzendingen/inzendingen.component';
import { GebruikerReviewComponent } from './reviews/gebruiker-review/gebruiker-review.component';
import { ReviewComponent } from './reviews/review/review.component';
import { BedrijfOpdrachtenComponent } from './dashboard/bedrijf-opdrachten/bedrijf-opdrachten.component';
import { GebruikerOpdrachtenComponent } from './dashboard/gebruiker-opdrachten/gebruiker-opdrachten.component';
import { BedrijfProfielComponent } from './gebruiker/bedrijf-profiel/bedrijf-profiel.component';
import { MakerProfielComponent } from './gebruiker/maker-profiel/maker-profiel.component';
import { BedrijfReviewComponent } from './reviews/bedrijf-review/bedrijf-review.component';
import { ReviewsModule } from './reviews/reviews.module';
import { AdminModule } from './admin/admin.module';
import { GebruikersBeherenComponent } from './admin/gebruikers-beheren/gebruikers-beheren/gebruikers-beheren.component';
import { ReviewsBeherenComponent } from './admin/reviews-beheren/reviews-beheren/reviews-beheren.component';
import { TagsBeherenComponent } from './admin/tags-beheren/tags-beheren/tags-beheren.component';
import { OpdrachtenBeherenComponent } from './admin/opdrachten-beheren/opdrachten-beheren/opdrachten-beheren.component';
import { SecurityInterceptor } from './security/security-interceptor';
import { AuthGuard } from './helpers/auth.guard';
import { Role } from './models/role.model';
import { AccountActivatieComponent } from './gebruiker/account-activatie/account-activatie.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registreren', component: RegistrerenComponent },
  { path: 'dashboard', component: DashboardComponent }, //opdrachten die beschikbaar zijn voor MAKER
  { path: 'gebruiker-opdrachten', component: GebruikerOpdrachtenComponent, canActivate: [AuthGuard], data: { roles: [Role.Maker] } }, //opdrachten die lopende zijn voor MAKER
  { path: 'bedrijf-opdrachten', component: BedrijfOpdrachtenComponent, canActivate: [AuthGuard], data: { roles: [Role.Company] } }, //opdrachten die lopende zijn voor BEDRIJF
  //(opdrachten worden ingezonden wanneer MAKER op aanvragen klikt bij opdracht)
  { path: 'inzendingen', component: InzendingenComponent, canActivate: [AuthGuard], data: { roles: [Role.Company] } }, //ingezonden opdrachten die nog geaccepteerd moeten worden DOOR BEDRIJF
  { path: 'profiel', component: ProfielComponent }, //eigen profiel bewerken EVERYONE
  { path: 'bedrijf-profiel', component: BedrijfProfielComponent }, //public profiel BEDRIJF
  { path: 'maker-profiel/:id1/:id2', component: MakerProfielComponent }, //public profiel MAKER
  { path: 'gebruiker-review', component: GebruikerReviewComponent, canActivate: [AuthGuard], data: { roles: [Role.Admin, Role.Maker] } }, //reviews voor MAKERS van BEDRIJVEN
  { path: 'bedrijf-review', component: BedrijfReviewComponent, canActivate: [AuthGuard], data: { roles: [Role.Admin, Role.Company] } }, //reviews voor BEDRIJVEN van MAKERS
  { path: 'review', component: ReviewComponent, canActivate: [AuthGuard], data: { roles: [Role.Company, Role.Maker] } }, //review maken
  //paths voor admin pagina's te testen
  { path: 'gebruikersBeheren', component: GebruikersBeherenComponent, canActivate: [AuthGuard], data: { roles: [Role.Admin] } }, //bedrijven en makers beheren
  { path: 'tagsBeheren', component: TagsBeherenComponent, canActivate: [AuthGuard], data: { roles: [Role.Admin] } }, //tags beheren
  { path: 'reviewsBeheren', component: ReviewsBeherenComponent, canActivate: [AuthGuard], data: { roles: [Role.Admin] } }, //reviews beheren
  { path: 'opdrachtenBeheren', component: OpdrachtenBeherenComponent, canActivate: [AuthGuard], data: { roles: [Role.Admin] } }, //reviews beheren

  { path: 'activeren/:activatiecode', component: AccountActivatieComponent },
  { path: 'maker-profiel/:makerID', component: MakerProfielComponent }, //public profiel MAKER
];

// @ts-ignore
@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    DashboardModule,
    GebruikerModule,
    ReviewsModule,
    AdminModule,
    RouterModule.forRoot(appRoutes, { enableTracing: false, onSameUrlNavigation: 'reload' }),
    AppRoutingModule
  ],
  exports: [
    RouterModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: SecurityInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule {
}

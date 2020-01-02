import { Component } from '@angular/core';
import { AuthenticateService } from './services/authenticate.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Match A Maker';
  aangemeld: boolean;
  isAdmin: boolean;
  isMaker: boolean;
  isCompany: boolean;
  isCurrentRouteAccountActivatie: boolean;

  constructor(private authenticateService: AuthenticateService, private _router: Router, private location: Location) {

    console.log(this.location.path());
    var huidigPath = this.location.path();
    if (huidigPath.includes('activeren')) {
      this.isCurrentRouteAccountActivatie = true;
    }

    this.authenticateService.isLoggedin.subscribe(result => {
      this.aangemeld = result;
      console.log("AANGEMELD: " + result);
      if (!this.aangemeld && !this.isCurrentRouteAccountActivatie) {
        _router.navigate(['/'])
      }
    })
    // nakijken welke rol de ingelogde gebruiker heeft, zodat aan de hand daarvan enkel de routes getoond worden in de navbar waar de gebruiker toegang tot heeft
    this.authenticateService.currentUserRoleSubject.subscribe(result => {
      switch (result) {
        case "Admin":
          this.isAdmin = true;
        case "Maker":
          this.isMaker = true;
        case "Company":
          this.isCompany = true;
      }
      console.log("Aangemelde rol: " + result)
    })
  }

  logOut() {
    this.authenticateService.logout()
    this.authenticateService.isLoggedin.subscribe(result => {
      this.aangemeld = result;
      console.log("AANGEMELD: " + result);
    })
    this.isAdmin = false;
    this.isCompany = false;
    this.isMaker = false;
  }
}

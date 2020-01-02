import { Component, OnInit } from '@angular/core';
import { UserLogin } from '../../models/user-login.model';
import { AuthenticateService } from '../../services/authenticate.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  model: UserLogin = new UserLogin('', '');
  submitted: Boolean = false;
  hide = true;
  errormessage: string = "";
  errorBool: boolean = false;

  constructor(private router: Router, private authenticateService: AuthenticateService) {
  }

  ngOnInit() {

  }

  onSubmit() {
    this.submitted = true;
    console.log(this.model);
    this.authenticateService.authenticate(this.model).subscribe(result => {
      console.log(result);
      if (result.isActive == true) {
        this.authenticateService.isLoggedin.next(true);
        this.authenticateService.currentUserRoleSubject.next(result.role);
        localStorage.setItem('token', result.token);
        localStorage.setItem('role', result.role);
        this.router.navigate(['/dashboard']);
      }
      else {
        this.errorBool = true;
        this.errormessage = "Gelieve uw account eerst te activeren via de mail die u ontvangen heeft.";
      }

    }, error => {
      this.submitted = false;
      this.errorBool = true;
      //this.errormessage = JSON.stringify(error);
      //this.errormessage = error.error.message;
      this.errormessage = "Inloggen mislukt, probeer opnieuw.";
    });
  }
}

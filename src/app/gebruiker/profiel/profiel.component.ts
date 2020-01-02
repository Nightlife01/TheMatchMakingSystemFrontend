import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {User} from '../../models/user.model';
import {GebruikerService} from '../../services/gebruiker.service';
import {Observable} from 'rxjs';
import {AuthenticateService} from '../../services/authenticate.service';
import {MakerService} from '../../services/maker.service';
import {BedrijfService} from '../../services/bedrijf.service';
import {Company} from '../../models/company.model';
import {Maker} from '../../models/maker.model';
import {MakerType} from '../../models/makerType';
import {MakerTypeService} from '../../services/maker-type.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-profiel',
  templateUrl: './profiel.component.html',
  styleUrls: ['./profiel.component.scss'],
  providers:[DatePipe]
})
export class ProfielComponent implements OnInit {
  registrationForm: FormGroup;
  companyForm: FormGroup;
  makerForm: FormGroup;
  errorBool: boolean = false;
  errorMessage: string = '';
  submitted: boolean = false;
  myUser: User;
  roles: any;
  isCompany : boolean;
  isMaker : boolean;
  display = 'none';

  user: User;
  company: Company;
  maker: Maker;
  makerTypes: Observable<MakerType[]>;
  huidigeUserID: number;
  birthdate : string;

  constructor(private _gebruikerService: GebruikerService, private _authenticateService: AuthenticateService, private datePipe : DatePipe,
              private _makerService: MakerService, private _bedrijfService: BedrijfService, private _makerTypeService: MakerTypeService) {
    this.registrationForm = new FormGroup({
      role: new FormControl('', {validators: [Validators.required]}),
      firstName: new FormControl('', {validators: [Validators.required]}),
      lastName: new FormControl('', {validators: [Validators.required]}),
      email: new FormControl('', {validators: [Validators.required, Validators.email]}),
      password: new FormControl('', {validators: [Validators.required, Validators.minLength(4)]}),
      oldPassword: new FormControl('', {validators: [Validators.required, Validators.minLength(4)]})
    });

    this.companyForm = new FormGroup({
      companyName: new FormControl('', {validators: [Validators.required]}),
      location: new FormControl('', {validators: [Validators.required]}),
      biography: new FormControl('', {validators: [Validators.required]})
    });

    this.makerForm = new FormGroup({
      makerTypeID: new FormControl('', {validators: [Validators.required]}),
      nickname: new FormControl('', {validators: [Validators.required]}),
      birthDate: new FormControl('', {validators: [Validators.required]}),
      biography: new FormControl('', {validators: [Validators.required]}),
      linkedIn: new FormControl('', {validators: [Validators.required]}),
      experience: new FormControl('', {validators: [Validators.required]}),
      contactInfo: new FormControl('', {validators: [Validators.required]})
      
    });


    // this._gebruikerService.getCurrentUser().subscribe(result => {
    //   this.huidigeUserID = result.userID;
    // });
    //
    // console.log(this.huidigeUserID);

    this._authenticateService.currentUserRoleSubject.subscribe(result => {
      console.log(result);
      if (result == 'Company') {
        this.isCompany = true;
      }
      if (result == 'Maker') {
        this.isMaker = true;
      }
    });
    
    this._gebruikerService.getCurrentUser().subscribe(
      user => {
        this.myUser = user;
        this.registrationForm.patchValue(user);
      });

    this._gebruikerService.getUserRoles().subscribe(res => {
      this.roles = res;
    });

    // bedrijf
    if(this.getCurrentGebruiker().role == "Company"){
        this._bedrijfService.getMyCompany().subscribe(res => {
        this.company = res;
        this.companyForm.patchValue(this.company);
      });
    }

    // maker
    if(this.getCurrentGebruiker().role == "Maker"){
        this._makerService.getMyMaker().subscribe(res => {
        this.maker = res;
        this.makerForm.patchValue(this.maker);

        // set birthday
        this.birthdate = this.datePipe.transform(this.maker.birthdate, 'yyyy-MM-dd');
      });

      this.makerTypes = this._makerTypeService.getMakerTypes();
    }
  }

  ngOnInit() {

  }

  getCurrentGebruiker() {
    if (localStorage.getItem('token') != null) {
      let jwtData = localStorage.getItem("token").split('.')[1];
      let decodedJwt = window.atob(jwtData);
      console.log(JSON.parse(decodedJwt));
      return JSON.parse(decodedJwt);
    }
    return null;
  }

  onSubmit() {
    this.submitted = true;
    const form = this.registrationForm.value;
    const user: User = new User(this.myUser.userID, form.email, form.password, form.firstName, form.lastName, form.role, true);
    this._gebruikerService.updateGebruiker(form.oldPassword, user).subscribe(result => {
      this.errorMessage = "";
      this.registrationForm.controls['password'].setValue("", {onlySelf: true});
      this.registrationForm.controls['oldPassword'].setValue("", {onlySelf: true});
      this.display = 'block';
    }, error => {
      this.submitted = false;
      this.errorBool = true;
      this.errorMessage = 'Er ging iets mis, probeer opnieuw.';
    });
  }

  onSubmitCompany() {
    this.submitted = true;
    const form = this.companyForm.value;
    const company: Company = new Company(this.company.companyID, this.myUser.userID, form.companyName, form.location, form.biography);
    this._bedrijfService.updateCompany(this.company.companyID, company).subscribe(result => {
      this.errorMessage = "";
      this.display = 'block';
      console.log(result);
    }, error => {
      this.submitted = false;
      this.errorBool = true;
      this.errorMessage = 'Er ging iets mis, probeer opnieuw.';
    });
  }

  onSubmitMaker() {
    this.submitted = true;
    const form = this.makerForm.value;
    const maker: Maker = new Maker(this.maker.makerID, form.makerTypeID, this.myUser.userID, form.nickname, new Date(this.birthdate), form.biography, form.linkedIn, form.experience, form.contactInfo);
    this._makerService.updateMaker(this.maker.makerID, maker).subscribe(result => {
      console.log(result);
      this.errorMessage = "";
      this.display = 'block';
    }, error => {
      this.submitted = false;
      this.errorBool = true;
      this.errorMessage = 'Er ging iets mis, probeer opnieuw.';
    });
  }
  onClosedHandled(){
    this.display='none';
    this.submitted = false;
  }
}

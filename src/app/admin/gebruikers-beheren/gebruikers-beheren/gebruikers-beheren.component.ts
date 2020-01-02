import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Tag} from '../../../models/tag.model';
import {Maker} from '../../../models/maker.model';
import {MakerService} from '../../../services/maker.service';
import {Company} from '../../../models/company.model';
import {BedrijfService} from '../../../services/bedrijf.service';
import {FormControl, FormGroup, Validators, FormBuilder} from '@angular/forms';
import {GebruikerService} from '../../../services/gebruiker.service';
import {User} from '../../../models/user.model';
import {MakerType} from '../../../models/makerType';
import {MakerTypeService} from '../../../services/maker-type.service';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-gebruikers-beheren',
  templateUrl: './gebruikers-beheren.component.html',
  styleUrls: ['./gebruikers-beheren.component.scss'],
  providers:[DatePipe]
})
export class GebruikersBeherenComponent implements OnInit {
  registrationForm: FormGroup;
  submitted: boolean = false;
  errorMessage: string = '';
  errorBool: boolean = false;
  title: string;

  makerForm: FormGroup;
  bedrijfForm: FormGroup;

  makers: Observable<Maker[]>;
  bedrijven: Observable<Company[]>;

  maker: Maker;
  makerID: number;

  bedrijf: Company;
  companyID: number;

  createMode : boolean = false;
  
  SelectMakerTypeID: any = '0';
  SelectUserID: any = '0';
  SelectUserRole: any = '0';
  displayDelete = 'none';
  displayOpslaan = 'none';

  birthdate : string;

  user: User;


  admins: Observable<User[]>;
  Users: Observable<User[]>;
  Roles: any;
  makerTypes: Observable<MakerType[]>;

  constructor(private _makerService: MakerService,
              private _bedrijfService: BedrijfService,
              private _gebruikerService: GebruikerService,
              private _makerTypeService: MakerTypeService,
              private router: Router, private datePipe : DatePipe) {
    this.makerForm = new FormGroup({
      makerTypeID: new FormControl(),
      userID: new FormControl(),
      nickname: new FormControl(),
      birthDate: new FormControl(),
      biography: new FormControl(),
      linkedIn: new FormControl(),
      experience: new FormControl(),
      contactInfo: new FormControl()
    });

    this.registrationForm = new FormGroup({
      role: new FormControl(),
      firstName: new FormControl('', {validators: [Validators.required]}),
      lastName: new FormControl('', {validators: [Validators.required]}),
      email: new FormControl('', {validators: [Validators.required, Validators.email]}),
      password: new FormControl('', {validators: [Validators.required, Validators.minLength(4)]}),
      controlPassword: new FormControl()
    });

    this.bedrijfForm = new FormGroup({
      name: new FormControl(),
      location: new FormControl(),
      biographyCompany: new FormControl()
    });

    this.makers = _makerService.getMakers();
    this.Users = _gebruikerService.getUsers();
    this.bedrijven = _bedrijfService.getCompanies();
    this.admins = _gebruikerService.getAdmins();
  }

  onClickBewerkMaker(gekozenMaker: Maker) {
    this.maker = gekozenMaker;
    this.submitted = true;
    this.user = this.maker.user;
    this.makerTypes = this._makerTypeService.getMakerTypes();
    this.title = "Maker bewerken";
    this.birthdate = this.datePipe.transform(this.maker.birthdate, 'yyyy-MM-dd');
    this.makerForm.controls['makerTypeID'].setValue(gekozenMaker.makerTypeID, {onlySelf: true});

  }

  onSubmitOpslaanMaker() {
      this._makerService.updateMaker(this.makerID, this.makerForm.value).subscribe(result => {
        this.submitted = true;
        this.displayOpslaan = 'block';
      }, error => {
        this.submitted = false;
        this.errorBool = true;
        this.errorMessage = 'Er is iets misgegaan bij het wijzigen.';
      });
  }

  clearMakerForm(){
    this.makerForm.controls['makerTypeID'].setValue("0", {onlySelf: true});
    this.makerForm.controls['userID'].setValue("0", {onlySelf: true});
    this.makerForm.controls['nickname'].setValue("", {onlySelf: true});
    this.makerForm.controls['birthDate'].setValue("", {onlySelf: true});
    this.makerForm.controls['biography'].setValue("", {onlySelf: true});
    this.makerForm.controls['linkedIn'].setValue("", {onlySelf: true});
    this.makerForm.controls['experience'].setValue("", {onlySelf: true});
    this.makerForm.controls['contactInfo'].setValue("", {onlySelf: true});
  }
  
  onClickVerwijderMaker(gekozenMaker: Maker) {
    this.maker = gekozenMaker;
  }

  onCLickVerwijderMaker(gekozenMaker: Maker) {
    this.maker = gekozenMaker;
    this.bedrijf = null;
    this.displayDelete='block';
  }

  onClickBewerkBedrijf(gekozenBedrijf: Company) {
    this.bedrijf = gekozenBedrijf;
    this.title = "Bedrijf bewerken";
  }

  onSubmitOpslaanBedrijf() {
    this.submitted = true;

    if (this.bedrijf == null) {
      this._bedrijfService.addCompany(this.bedrijfForm.value).subscribe();
    } else {
      this._bedrijfService.updateCompany(this.companyID, this.bedrijfForm.value).subscribe();
    }
  }

  onCLickVerwijderBedrijf(gekozenBedrijf: Company) {
    this.bedrijf = gekozenBedrijf;
    this.maker = null;
    this.displayDelete='block';
  }

  /*------------------------------
  ---------- Users ---------------
  ------------------------------*/
  onClickEditUser(user: User){
    this.registrationForm.patchValue(this.user);
    this.createMode = false;
    this._gebruikerService.getUserRoles().subscribe(res => {
      this.Roles = res;
    });
  }

  onClickRegisterUser(){
    this.title = "Gebruiker toevoegen";
    this.createMode = true;
    this._gebruikerService.getUserRoles().subscribe(res => {
      this.Roles = res;
    });
    this.registrationForm.controls['Role'].setValue("0", {onlySelf: true});
  }

  onSubmitRegisterUser() {
    if(this.createMode){
      this.submitted = true;
      const form = this.registrationForm.value;
      console.log('FORM: ' + JSON.stringify(form));

      //const user = new User(0,form.firstName, form.lastName,form.email, Date.now().toLocaleString(), form.password, this.selectedRole);
      this.user = new User(0, form.email, form.password, form.firstName, form.lastName, form.role, false);
      
      // check password match
      if(form.ControlPassword != this.user.password){
        this.errorMessage = 'Wachtwoorden matchen niet.';
        this.errorBool = true;
        this.submitted = false;
        return;
      }

      this._gebruikerService.createUser(this.user).subscribe(result => {
          // this.showSavedMessage();
          this.clearUserForm();
          this.errorMessage = '';
          window.location.reload();
        },
        error => {
          this.errorBool = true;
          this.submitted = false;
          console.log('ERROR: ' + JSON.stringify(error));
          this.errorMessage = 'Registration failed, please try again.';
        }
      );
      
      //window.location.reload();
      this.router.navigateByUrl('/gebruikersBeheren', { skipLocationChange: true }).then(() => {
        this.router.navigate(['gebruikersBeheren']);
      }); 
    }else{
      this.submitted = true;
      const form = this.registrationForm.value;
      const user: User = new User(this.user.userID, form.email, form.password, form.firstName, form.lastName, this.user.role, true);
      this._gebruikerService.updateGebruiker("", user).subscribe(result => {
        this.errorMessage = "";
        this.registrationForm.controls['password'].setValue("", {onlySelf: true});
        this.registrationForm.controls['oldPassword'].setValue("", {onlySelf: true});
        this.displayOpslaan = 'block';
      }, error => {
        this.submitted = false;
        this.errorBool = true;
        this.errorMessage = 'Er ging iets mis, probeer opnieuw.';
      });
    }
  }

  clearUserForm(){
    this.registrationForm.controls['makerTypeID'].setValue("0", {onlySelf: true});
    this.registrationForm.controls['email'].setValue("", {onlySelf: true});
    this.registrationForm.controls['firstName'].setValue("", {onlySelf: true});
    this.registrationForm.controls['lastName'].setValue("", {onlySelf: true});
    this.registrationForm.controls['password'].setValue("", {onlySelf: true});
    this.registrationForm.controls['controlPassword'].setValue("", {onlySelf: true});
  }

  ngOnInit() {

  }
  onClosedHandled(){
    this.displayOpslaan='none';
    this.displayDelete='none';
    this.submitted = false;
  }
  onDeleteHandled(){
    if(this.maker != null){
      this._makerService.deleteMaker(this.maker.makerID).subscribe();
      this._gebruikerService.deleteUser(this.maker.userID).subscribe();
    }

    if(this.bedrijf != null){
      this._bedrijfService.deleteCompany(this.bedrijf.companyID).subscribe();
      this._gebruikerService.deleteUser(this.bedrijf.userID).subscribe();
    }

    this.displayOpslaan='none';
    this.submitted = false;
    window.location.reload();
  }

}

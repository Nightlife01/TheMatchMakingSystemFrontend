import {MakerService} from './../../services/maker.service';
import {AuthenticateService} from './../../services/authenticate.service';
import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Assignment} from '../../models/assignment.model';
import {OpdrachtService} from '../../services/opdracht.service';
import {GebruikerService} from '../../services/gebruiker.service';
import {TagService} from '../../services/tag.service';
import {Tag} from 'src/app/models/tag.model';
import {Router} from '@angular/router';
import {Company} from '../../models/company.model';
import {BedrijfService} from '../../services/bedrijf.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Review} from '../../models/review.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public opdrachten: Assignment[];
  searchText: string = '';
  filterOpdrachten: any;
  selectedCompanyID: number;
  makerID: number;
  tags: any;
  selectedTags: Tag[] = [];
  isMaker: boolean;
  isCompany: boolean;
  //companyID: number = 0;
  //unassignedAssignments: Assignment[];
  selectedAssignmentID: number;
  selectedAssignment: Assignment;
  opdracht: Assignment;

  opdrachtForm: FormGroup;
  errorBool: boolean = false;
  submitted: boolean = false;
  errorMessage: string = '';
  selectedReceiverID : number = null;
  selectedReviewAssignment : Assignment= null;
  currentUID : number = null;

  constructor(private _opdrachtService: OpdrachtService, private _gebruikerService: GebruikerService, private _tagService: TagService,
              private _authenticateService: AuthenticateService, private _makerService: MakerService, private router: Router) {
    this._authenticateService.currentUserRoleSubject.subscribe(result => {
      console.log(result);
      if (result == 'Company') {
        this.isCompany = true;
      }
      if (result == 'Maker') {
        this.isMaker = true;
      }
    });

    this.opdrachtForm = new FormGroup({
      title: new FormControl('', {validators: [Validators.required]}),
      description: new FormControl('', {validators: [Validators.required]}),
      closeDate: new FormControl('', {validators: [Validators.required]})
    });
  }

  ngOnInit() {
    if (localStorage.getItem('reload')) {
      window.location.reload();
      localStorage.removeItem('reload');
    }
    this._opdrachtService.getAssignments().subscribe(res => {
      this.opdrachten = res; // de volledige lijst met opdrachten die nooit overschreven/ aangepast mag worden
      this.filterOpdrachten = res; // de lijst waarop gefilterd kan worden
      console.log(this.opdrachten);
    });
    this._gebruikerService.getCurrentUser().subscribe(res => this.makerID = res.userID);
    this._tagService.getTags().subscribe(res => {
      this.tags = res;
      console.log(this.tags);
    });
    this.currentUID = this.getCurrentGebruiker().UserID;
  }

  close() {
    this.selectedCompanyID = null;
    this.selectedReceiverID =null;
    this.selectedAssignmentID = null;
  }

  showBedrijfInfo(opdracht: Assignment) {
    this.selectedCompanyID = opdracht.companyID;
    console.log(opdracht.companyID);
  }

  assignmentAanvragen(opdracht: Assignment) {
    this._opdrachtService.addAssignmentRequest(opdracht.assignmentID, this.makerID).subscribe();
    console.log('ASSIGNMENT ID: ' + opdracht.assignmentID + '  MAKER ID: ' + this.makerID);
    window.location.reload();
  }

  logTags(tags: any) {
    console.log('TAGS: ' + JSON.stringify(tags));
  }

  onSelectionChangeTags(checkedTag: Tag) {
    if (this.selectedTags.includes(checkedTag)) { // wanneer er een change event is op een reeds geselecteerde checkbox gaan we deze wissen uit de lijst van selectedTags (omdat we de checkbox uitvinken)
      const index: number = this.selectedTags.indexOf(checkedTag);
      if (index !== -1) {
        this.selectedTags.splice(index, 1);
      }
    } else { // wanneer er een change event is op een checkbox die nog niet aangevinkt was gaan we deze toevoegen aan de lijst van selectedTags
      this.selectedTags.push(checkedTag);
    }
    if (this.selectedTags.length > 0) { // wanneer er items in de lijst zitten gaan we de lijst van filterOpdrachten aanpasen
      console.log(this.selectedTags);
      this.getUpdatedListAssignments();
    } else { // wanneer er geen checkbox aangevinkt is wordt de lijst van filterOpdrachten opgevuld met de lijst van alle opdrachten die we uit de API hadden opgehaald en bewaard
      this.filterOpdrachten = this.opdrachten;
    }
  }

  getUpdatedListAssignments() {
    var tempListOpdrachten = [];
    for (var tag of this.selectedTags) {
      for (var opdracht of this.opdrachten) {
        for (var item of opdracht.listTags) {
          if (item.tagID === tag.tagID) {
            if (!tempListOpdrachten.includes(opdracht)) {
              tempListOpdrachten.push(opdracht);
            }
          }
        }
      }
    }
    this.filterOpdrachten = tempListOpdrachten;
  }

  closeModal() {
    this.selectedCompanyID = 0;
  }

  makersOphalen(assignment: Assignment) {
    this.selectedAssignment = assignment;
    this.selectedAssignmentID = assignment.assignmentID;
    console.log(this.selectedAssignmentID);
  }

  goToMakerProfile(makerID: number) {
    this.router.navigate(['/maker-profiel', makerID, '']);
  }

  closeMakersModal() {
    this.selectedAssignmentID = null;
  }

  toevoegenOpdracht() {
    const form = this.opdrachtForm.value;
    this.opdracht = new Assignment(0, this.opdrachten[0].companyID, form.title, form.description, form.closeDate);

    this._opdrachtService.addAssignment(this.opdracht).subscribe(result => {
      this.submitted = true;
      window.location.reload();
    }, error => {
      this.submitted = false;
      this.errorBool = true;
      this.errorMessage = 'Er is iets misgegaan bij het toevoegen. Vul alle velden in.';
    });
  }

  newMakerReview(receiverID: any, opdracht : Assignment) {
    this.selectedReceiverID = receiverID;
    this.selectedReviewAssignment = opdracht;
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
}

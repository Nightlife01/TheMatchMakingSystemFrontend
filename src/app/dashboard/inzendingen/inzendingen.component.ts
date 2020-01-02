import { Component, OnInit, Input } from '@angular/core';
import { OpdrachtService } from 'src/app/services/opdracht.service';
import { Assignment } from 'src/app/models/assignment.model';
import { MakerService } from 'src/app/services/maker.service';
import { Maker } from 'src/app/models/maker.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inzendingen',
  templateUrl: './inzendingen.component.html',
  styleUrls: ['./inzendingen.component.scss']
})
export class InzendingenComponent implements OnInit {
  @Input() assignmentID: number;
  @Input() assignment: Assignment;
  temp: number;
  makers: Maker[] = [];

  constructor(private _makerService: MakerService, private router: Router, private _opdrachtService: OpdrachtService) {
  }

  ngOnInit() {
    this.temp = this.assignmentID;
    this.getInterestedMakersByAssignmentID(this.temp);
  }

  getInterestedMakersByAssignmentID(assignmentID: number) {
    this._makerService.getInterestedMakersByAssignmentID(assignmentID).subscribe(result => {
      console.log(result);
      this.makers = result;
    })
  }

  goToMakerProfile(makerID: number) {
    this.router.navigate(['/maker-profiel', makerID, this.assignmentID]);
  }

  updateAssignment(makerID: number) {
    this.assignment.makerID = makerID;
    this._opdrachtService.updateAssignmentAndSendMails(this.assignmentID, this.assignment).subscribe(result => {
      console.log(result);
      window.location.reload();
    })
  }
}

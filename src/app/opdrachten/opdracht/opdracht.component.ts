import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {OpdrachtService} from '../../services/opdracht.service';

@Component({
  selector: 'app-opdracht',
  templateUrl: './opdracht.component.html',
  styleUrls: ['./opdracht.component.scss']
})
export class OpdrachtComponent implements OnInit {

  opdrachtForm: FormGroup;
  errorBool: boolean = false;
  submitted: boolean = false;
  errorMessage: string = '';

  constructor(private _opdrachtService: OpdrachtService) {
    this.opdrachtForm = new FormGroup({
      companyID: new FormControl('', {validators: [Validators.required]}),
      title: new FormControl('', {validators: [Validators.required]}),
      description: new FormControl('', {validators: [Validators.required]}),
      deadline: new FormControl('', {validators: [Validators.required]}),
      location: new FormControl('', {validators: [Validators.required]}),
    });
  }

  ngOnInit() {
  }

  onSubmit() {
    this._opdrachtService.addAssignment(this.opdrachtForm.value).subscribe(result => {
      this.submitted = true;
    }, error => {
      this.submitted = false;
      this.errorBool = true;
      this.errorMessage = 'Er is iets misgegaan bij het toevoegen.';
    });
  }

}

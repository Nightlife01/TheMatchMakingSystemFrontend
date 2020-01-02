import {Component, Input, OnInit} from '@angular/core';
import {BedrijfService} from '../../services/bedrijf.service';
import {Company} from '../../models/company.model';
import {Observable} from 'rxjs';
import {Tag} from '../../models/tag.model';
import { Assignment } from 'src/app/models/assignment.model';
import { OpdrachtService } from 'src/app/services/opdracht.service';

@Component({
  selector: 'app-bedrijf-profiel',
  templateUrl: './bedrijf-profiel.component.html',
  styleUrls: ['./bedrijf-profiel.component.scss']
})
export class BedrijfProfielComponent implements OnInit {
  @Input() companyID: number;
  bedrijf: Company ;
  tags: Observable<Tag[]>;
  temp : number;

  constructor(private _bedrijfService: BedrijfService, private _opdrachtService : OpdrachtService) {

  }

  ngOnInit() {
    this.temp = this.companyID;
    this._bedrijfService.getCompany(this.temp).subscribe(result => {
      this.bedrijf = result;
    });
  }

}

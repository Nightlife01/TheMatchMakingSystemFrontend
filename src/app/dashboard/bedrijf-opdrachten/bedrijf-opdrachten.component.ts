import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bedrijf-opdrachten',
  templateUrl: './bedrijf-opdrachten.component.html',
  styleUrls: ['./bedrijf-opdrachten.component.scss']
})
export class BedrijfOpdrachtenComponent implements OnInit {
  searchText : string = "";
  constructor() { }

  ngOnInit() {
  }

}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-peoplexcomisaria',
  templateUrl: './peoplexcomisaria.component.html',
  styleUrls: ['./peoplexcomisaria.component.css']
})
export class PeoplexcomisariaComponent implements OnInit {

  ngOnInit(): void {

  }

  constructor(public route: ActivatedRoute) { }

}

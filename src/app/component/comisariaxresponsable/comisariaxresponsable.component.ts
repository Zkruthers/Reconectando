import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-comisariaxresponsable',
  templateUrl: './comisariaxresponsable.component.html',
  styleUrls: ['./comisariaxresponsable.component.css']
})
export class ComisariaxresponsableComponent implements OnInit {

  ngOnInit(): void {

  }

  constructor(public route: ActivatedRoute) { }

}

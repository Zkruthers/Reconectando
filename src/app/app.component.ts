import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'tf_arquiweb';

  constructor(private http: HttpClient){

  }

  ngOnInit(): void {
    this.http.get('http://localhost:5000/inicio').subscribe(data => {
      console.log(data);
    });
  }
}

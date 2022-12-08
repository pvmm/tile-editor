import { Component, OnInit } from '@angular/core';
import { bla } from './app.module';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'sample-app';

  ngOnInit() {
    console.log("onInit()");
  }
}

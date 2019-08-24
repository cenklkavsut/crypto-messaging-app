import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
public visible='visible'
  constructor() { }

  visabilityChanger(){
    this.visible= this.visible=='visible'?'hidden':'visible';
  }

  ngOnInit() {
  }

}
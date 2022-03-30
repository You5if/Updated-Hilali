import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-system-home',
  templateUrl: './system-home.component.html',
  styleUrls: ['./system-home.component.scss']
})
export class SystemHomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    console.log("*\n**\n***\n****")
    console.log("****\n***\n**\n*")
    console.log("   *\n  * *\n * * *\n* * * *")
  }

}

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  navLinks = [
     {
       label: 'Dashboard',
       path: './'
     },
     {
       label: 'Manage Records',
       path: './records'
     },
     {
       label: 'Manage Users',
       path: './users'
     }
  ];

  constructor() { }

  ngOnInit() {
  }

}

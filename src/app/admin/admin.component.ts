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
       label: 'Manage Tasks',
       path: './'
     },
     {
       label: 'Manage Users',
       path: './'
     }
  ];

  activeLink = this.navLinks[0];

  constructor() { }

  ngOnInit() {
  }

}

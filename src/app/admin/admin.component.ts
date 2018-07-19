import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  links = ['Dashboard', 'Manage Tasks', 'Manage Users'];
  activeLink = this.links[0];

  constructor() { }

  ngOnInit() {
  }

}

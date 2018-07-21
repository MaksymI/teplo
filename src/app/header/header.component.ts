import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  navLinks = [
    {
      label: 'Records',
      path: './record-list'
    },
    {
      label: 'Users',
      path: './users'
    },
    {
      label: 'Admin',
      path: './admin'
    },
    {
      label: 'Home',
      path: './home'
    },
    {
      label: 'About',
      path: './about'
    }
  ];

  isAuthenticated = false;

  constructor(public authService: AuthService) { }

  ngOnInit() {
  }

}

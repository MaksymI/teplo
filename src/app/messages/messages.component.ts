import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { MessagesService } from '../services/messages.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent {

  constructor(
    public messagesService: MessagesService,
    private router: Router
  ) {}

  onClose() {
    this.router.navigate([{ outlets: { popup: null } }]);
    this.messagesService.isDispayed = false;
  }

}

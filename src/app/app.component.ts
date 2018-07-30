import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MessagesService } from './services/messages.service';
import { SpinnerService } from '.';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(
    private router: Router,
    public messagesService: MessagesService,
    public spinnerService: SpinnerService
  ) {}

  onDisplayMessages(): void {
    this.router.navigate([{ outlets: { popup: ['messages'] } }]);
    this.messagesService.isDispayed = true;
  }
}

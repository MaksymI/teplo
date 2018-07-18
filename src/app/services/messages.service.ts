import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {
  isDispayed = false;

  private messages: string[] = [];

  addMessage(message: string): void {
    const currentDate = new Date();
    this.messages.unshift(`${message} at ${currentDate.toLocaleString()}`);
  }

  getMesages(): Array<string> {
    return this.messages;
  }

  clearMessageList(): void {
    this.messages.length = 0;
  }

  constructor() { }
}

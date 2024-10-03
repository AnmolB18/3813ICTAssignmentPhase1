// src/app/chat/chat.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-chat', // Make sure this matches the selector used in app.component.html
  standalone: true,
  imports: [CommonModule],
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent {
  // Component logic here
}
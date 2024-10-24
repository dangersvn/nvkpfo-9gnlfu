import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterBarComponent } from "../footer-bar/footer-bar.component";
import { MatSlideToggle, MatSlideToggleModule } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-conversation-toggle',
  standalone: true,
  imports: [CommonModule, FooterBarComponent, MatSlideToggleModule],
  templateUrl: './conversation-toggle.component.html',
  styleUrl: './conversation-toggle.component.scss'
})
export class ConversationToggleComponent {

}

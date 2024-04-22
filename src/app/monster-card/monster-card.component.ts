import { Component, Input } from '@angular/core';
import { Animal } from '../../types';

@Component({
  selector: 'app-monster-card',
  standalone: true,
  imports: [],
  templateUrl: './monster-card.component.html',
  styleUrl: './monster-card.component.css'
})
export class MonsterCardComponent {
@Input() monster: Animal | undefined = undefined;
}

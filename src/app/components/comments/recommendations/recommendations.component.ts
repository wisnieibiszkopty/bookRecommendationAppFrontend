import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-recommendations',
  standalone: true,
  imports: [],
  templateUrl: './recommendations.component.html',
  styleUrl: './recommendations.component.scss'
})
export class RecommendationsComponent {
  @Input() bookId: number = 0;
}

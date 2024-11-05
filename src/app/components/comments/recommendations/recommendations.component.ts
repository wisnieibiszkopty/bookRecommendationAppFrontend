import {Component, Input} from '@angular/core';
import {UserService} from '../../../services/user.service';
import {Button} from 'primeng/button';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-recommendations',
  standalone: true,
  imports: [
    Button,
    RouterLink
  ],
  templateUrl: './recommendations.component.html',
  styleUrl: './recommendations.component.scss'
})
export class RecommendationsComponent {
  @Input() bookId: number = 0;

  constructor(protected userService: UserService ) {
  }
}

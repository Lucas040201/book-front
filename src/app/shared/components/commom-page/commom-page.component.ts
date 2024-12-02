import { Component } from '@angular/core';
import {NavBarComponent} from '../nav-bar/nav-bar.component';
import {FooterComponent} from '../footer/footer.component';
import {RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-commom-page',
  imports: [
    NavBarComponent,
    FooterComponent,
    RouterOutlet
  ],
  templateUrl: './commom-page.component.html',
  standalone: true,
  styleUrl: './commom-page.component.scss'
})
export class CommomPageComponent {

}

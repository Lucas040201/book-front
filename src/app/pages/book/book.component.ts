import { Component } from '@angular/core';
import {RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-book',
  imports: [
    RouterOutlet,
  ],
  standalone: true,
  templateUrl: './book.component.html',
})
export class BookComponent {

}

import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {HttpClientModule} from '@angular/common/http';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    HttpClientModule,
  ],
  standalone: true,
  template: `<router-outlet></router-outlet>`
})
export class AppComponent {
}

import { Component } from '@angular/core';
import {BookFormComponent} from '../../../shared/components/book-form/book-form.component';
import {BookService} from '../../../shared/services/book/book.service';
import BookForm from '../../../shared/interfaces/book-form.interface';
import {Router, RouterLink} from '@angular/router';
import ShowBookDto from '../../../shared/services/book/dto/show-book.dto';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-create',
  imports: [
    BookFormComponent,
    RouterLink,
    MatIcon
  ],
  templateUrl: './create.component.html',
  standalone: true,
})
export class CreateComponent {
  constructor(
    private bookService: BookService,
    private router: Router,
  ) {
  }

  submit(event: BookForm) {
    this.bookService.create(event).subscribe((book: ShowBookDto|null) => {
      if(book?.code != 201 && !book?.data) {
        return;
      }
      this.router.navigate(['book', book.data.id]);
    })
  }
}

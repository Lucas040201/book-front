import {Component, OnInit} from '@angular/core';
import {BookFormComponent} from '../../../shared/components/book-form/book-form.component';
import {BookService} from '../../../shared/services/book/book.service';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import BookForm from '../../../shared/interfaces/book-form.interface';
import ShowBookDto from '../../../shared/services/book/dto/show-book.dto';
import BookDto from '../../../shared/services/book/dto/book.dto';
import {MatIcon} from '@angular/material/icon';
import {LoaderComponent} from '../../../shared/components/loader/loader.component';

@Component({
  selector: 'app-update',
  imports: [
    BookFormComponent,
    MatIcon,
    RouterLink,
    LoaderComponent
  ],
  templateUrl: './update.component.html',
  standalone: true,
})
export class UpdateComponent implements OnInit {
  bookData!: BookDto;
  loading = false;

  constructor(
    private bookService: BookService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) {
  }

  ngOnInit() {
    this.loading = true;
    this.activatedRoute.params.subscribe(params => {
      this.bookService.show(params['id']).subscribe((book: ShowBookDto|null) => {
        if(book?.data) {
          this.bookData = book.data;
        }
        this.loading = false;
      });
    })
  }

  submit(event: BookForm) {
    if(this.bookData?.id) {
      this.bookService.update(this.bookData.id, event).subscribe((book: ShowBookDto|null) => {
        if(book?.code != 201 && !book?.data) {
          return;
        }
        this.router.navigate(['book', book.data.id]);
      })
    }
  }
}

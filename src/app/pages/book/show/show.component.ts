import {Component, OnInit} from '@angular/core';
import {BookService} from '../../../shared/services/book/book.service';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import BookDto from '../../../shared/services/book/dto/book.dto';
import ShowBookDto from '../../../shared/services/book/dto/show-book.dto';
import {MatIcon} from '@angular/material/icon';
import {MatTooltip} from '@angular/material/tooltip';
import {LoaderComponent} from '../../../shared/components/loader/loader.component';
import {MatDialog} from '@angular/material/dialog';
import {DeleteComponent} from '../../../shared/components/dialog/delete/delete.component';

@Component({
  selector: 'app-show',
  imports: [
    MatIcon,
    MatTooltip,
    RouterLink,
    LoaderComponent
  ],
  templateUrl: './show.component.html',
  standalone: true,
})
export class ShowComponent implements OnInit {
  constructor(
    private bookService: BookService,
    private activatedRoute: ActivatedRoute,
    private dialog: MatDialog,
    private router: Router
  ) {
  }

  currentBook?:BookDto;
  loading = false;

  ngOnInit() {
    this.loading = true;
    this.activatedRoute.params.subscribe(params => {
      this.bookService.show(params['id']).subscribe((book: ShowBookDto|null) => {
        if(book?.data) {
          this.currentBook = book.data;
          this.currentBook.price = new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
          }).format(Number(this.currentBook.price) / 100).toString();
        }
        this.loading = false;
      });
    })
  }

  delete() {
    if(!this.currentBook?.id) return;

    this.dialog.open(DeleteComponent, {
      data: {bookId: this.currentBook.id}
    }).afterClosed().subscribe(() => {
      this.router.navigate(['/']);
    })
  }
}

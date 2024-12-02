import {Component, OnInit} from '@angular/core';
import {BookService} from '../../shared/services/book/book.service';
import ListBookDto from '../../shared/services/book/dto/list-book.dto';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import BookPaginationDto from '../../shared/services/book/dto/book-pagination.dto';
import PaginationParamsDto from '../../shared/services/dto/pagination-params.dto';
import {RouterLink} from '@angular/router';
import {MatIcon} from '@angular/material/icon';
import {DefaultFormFilterComponent} from '../../shared/components/default-form-filter/default-form-filter.component';
import FormFilter from '../../shared/interfaces/form-filter.interface';
import {MatDialog} from '@angular/material/dialog';
import {DeleteComponent} from '../../shared/components/dialog/delete/delete.component';
import {SortEnum} from '../../shared/enums/sort.enum';
import {LoaderComponent} from '../../shared/components/loader/loader.component';

@Component({
  selector: 'app-home',
  imports: [
    MatPaginator,
    RouterLink,
    MatIcon,
    DefaultFormFilterComponent,
    LoaderComponent
  ],
  templateUrl: './home.component.html',
  standalone: true,
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  booksPagination!: BookPaginationDto;
  loading = false

  private params: PaginationParamsDto = {
    limit: 5,
    page: 1,
    sort: SortEnum.asc,
    search: ''
  }

  constructor(
    private bookService: BookService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.loading = true;
    this.loadBooks();
  }

  handlePage(event: PageEvent) {
    this.params.page = (event.pageIndex + 1);
    this.params.limit = event.pageSize;
    this.loadBooks();
  }

  submitForm(formFilter: FormFilter) {
    this.params.sort = formFilter.sort;
    this.params.search = formFilter.search;
    this.loadBooks();
  }

  delete(bookId?: string) {
    this.dialog.open(DeleteComponent, {
      data: {bookId}
    }).afterClosed().subscribe(() => {
      this.params.sort = SortEnum.asc;
      this.params.search = '';
      this.params.page = 1;
      this.loadBooks();
    })
  }

  private loadBooks() {
    this.bookService.getBooks(this.params).subscribe((response: ListBookDto) => {
      this.booksPagination = response.data;
      this.loading = false;
    });
  }
}

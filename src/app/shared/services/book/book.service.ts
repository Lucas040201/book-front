import {Injectable} from '@angular/core';
import {environment} from '../../../../environments/environment';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import ListBookDto from './dto/list-book.dto';
import PaginationParamsDto from '../dto/pagination-params.dto';
import {catchError} from 'rxjs/operators';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Observable, Observer} from 'rxjs';
import ShowBookDto from './dto/show-book.dto';
import BookForm from '../../interfaces/book-form.interface';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private apiUrl = environment.apiHost;
  constructor(
    private snackBar: MatSnackBar,
    private router: Router,
    private http: HttpClient,
  ) { }

  getBooks(params: PaginationParamsDto) {
    const queryString = `?limit=${params.limit}&page=${params.page}&sort=${params.sort}&search=${params.search}`;
    return this.http.get<ListBookDto>(`${this.apiUrl}/api/v1/book${queryString}`);
  }

  show(id: string) {
    return this.http.get<ShowBookDto|null>(`${this.apiUrl}/api/v1/book/${id}`)
      .pipe(catchError(err => this.errorHandler(err, ['/'])))
  }

  delete(id: string) {
    return this.http.delete(`${this.apiUrl}/api/v1/book/${id}`)
  }

  create(bookData: BookForm) {
    return this.http.post<ShowBookDto>(`${this.apiUrl}/api/v1/book`, bookData)
      .pipe(catchError(err => this.errorHandler(err)));
  }

  update(bookId: string, bookData: BookForm) {
    return this.http.put<ShowBookDto>(`${this.apiUrl}/api/v1/book/${bookId}`, bookData)
      .pipe(catchError(err => this.errorHandler(err)));
  }

  errorHandler(error: HttpErrorResponse, redirect: string[]|null = null) {
    return new Observable((observer: Observer<null>) => {

      let message = "Something went wrong";

      if(error.error?.error) {
        message = error.error.error;
      }
      this.snackBar.open(message, 'ok', {
        duration: 5000,
      });
      if(redirect) {
        this.router.navigate([redirect.join()]);
      }
      observer.complete();
    })
  }
}

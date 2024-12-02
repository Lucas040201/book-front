import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogActions, MatDialogRef, MatDialogTitle} from '@angular/material/dialog';
import {BookService} from '../../../services/book/book.service';

@Component({
  selector: 'app-delete',
  imports: [
    MatDialogTitle,
    MatDialogActions
  ],
  templateUrl: './delete.component.html',
  standalone: true
})
export class DeleteComponent {
  constructor(
    private dialogRef: MatDialogRef<DeleteComponent>,
    private bookService: BookService,
    @Inject(MAT_DIALOG_DATA) public data: {bookId: string}
  ) { }

  close() {
    this.dialogRef.close();
  }

  delete(): void {
    this.bookService.delete(this.data.bookId).subscribe(() => {
      this.dialogRef.close()
    });
  }
}

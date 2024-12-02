import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import BookForm from '../../interfaces/book-form.interface';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import BookDto from '../../services/book/dto/book.dto';

@Component({
  selector: 'app-book-form',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './book-form.component.html',
  standalone: true,
})
export class BookFormComponent implements OnInit{
  @Output() formValue = new EventEmitter<BookForm>();
  @Input() bookData?: BookDto;

  form!: FormGroup;

  constructor(
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      title: [this.bookData?.title ?? '', [Validators.required]],
      description: [this.bookData?.description ?? '', [Validators.required]],
      price: [ this.formatNumber() ?? 0, [Validators.required]],
      quantity: [this.bookData?.quantity ?? 0, [Validators.required]],
    })
  }

  private formatNumber() {
    if(!this.bookData?.price) return;
    return Number(this.bookData.price) / 100;
  }

  submit() {
    const formData: BookForm = {...this.form.value}
    formData.price = Math.round((Math.abs(formData.price) / 100) * 10000);
    this.formValue.emit(formData)
  }
}

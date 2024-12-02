import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';
import FormFilter from '../../interfaces/form-filter.interface';

@Component({
  selector: 'app-default-form-filter',
  imports: [
    ReactiveFormsModule
  ],
  standalone: true,
  templateUrl: './default-form-filter.component.html',
})
export class DefaultFormFilterComponent implements OnInit {

  form!: FormGroup;

  @Output() filterFormEvent = new EventEmitter<FormFilter>();

  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      search: [''],
      sort: ['asc']
    });
  }

  submit() {
    const data: FormFilter = {
      search: this.form.get('search')?.value,
      sort: this.form.get('sort')?.value
    }
    this.filterFormEvent.emit(data);
  }

}

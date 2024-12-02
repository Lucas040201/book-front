import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefaultFormFilterComponent } from './default-form-filter.component';

describe('DefaultFormFilterComponent', () => {
  let component: DefaultFormFilterComponent;
  let fixture: ComponentFixture<DefaultFormFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DefaultFormFilterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DefaultFormFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

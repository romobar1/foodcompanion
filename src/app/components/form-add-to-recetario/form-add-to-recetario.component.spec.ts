import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormAddToRecetarioComponent } from './form-add-to-recetario.component';

describe('FormAddToRecetarioComponent', () => {
  let component: FormAddToRecetarioComponent;
  let fixture: ComponentFixture<FormAddToRecetarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormAddToRecetarioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormAddToRecetarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

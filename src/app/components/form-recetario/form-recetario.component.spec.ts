import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormRecetarioComponent } from './form-recetario.component';

describe('FormRecetarioComponent', () => {
  let component: FormRecetarioComponent;
  let fixture: ComponentFixture<FormRecetarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormRecetarioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormRecetarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

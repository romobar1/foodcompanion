import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormRecetaComponent } from './form-receta.component';

describe('FromRecetaComponent', () => {
  let component: FormRecetaComponent;
  let fixture: ComponentFixture<FormRecetaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormRecetaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormRecetaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

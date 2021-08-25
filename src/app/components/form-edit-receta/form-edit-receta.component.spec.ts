import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormEditRecetaComponent } from './form-edit-receta.component';

describe('FormEditRecetaComponent', () => {
  let component: FormEditRecetaComponent;
  let fixture: ComponentFixture<FormEditRecetaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormEditRecetaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormEditRecetaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

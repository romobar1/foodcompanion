import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormReplyComponent } from './form-reply.component';

describe('FormReplyComponent', () => {
  let component: FormReplyComponent;
  let fixture: ComponentFixture<FormReplyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormReplyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormReplyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

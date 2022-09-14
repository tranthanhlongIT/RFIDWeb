import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormModalDeleteComponent } from './form-modal-delete.component';

describe('FormModalDeleteComponent', () => {
  let component: FormModalDeleteComponent;
  let fixture: ComponentFixture<FormModalDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormModalDeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormModalDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

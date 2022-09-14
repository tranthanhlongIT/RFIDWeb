import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Thunghiem1Component } from './thunghiem1.component';

describe('Thunghiem1Component', () => {
  let component: Thunghiem1Component;
  let fixture: ComponentFixture<Thunghiem1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Thunghiem1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Thunghiem1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

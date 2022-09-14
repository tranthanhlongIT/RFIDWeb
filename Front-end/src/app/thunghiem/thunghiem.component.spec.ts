import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThunghiemComponent } from './thunghiem.component';

describe('ThunghiemComponent', () => {
  let component: ThunghiemComponent;
  let fixture: ComponentFixture<ThunghiemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThunghiemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThunghiemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

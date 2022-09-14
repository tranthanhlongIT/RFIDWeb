import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LayouthethongComponent } from './layouthethong.component';

describe('LayouthethongComponent', () => {
  let component: LayouthethongComponent;
  let fixture: ComponentFixture<LayouthethongComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LayouthethongComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LayouthethongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

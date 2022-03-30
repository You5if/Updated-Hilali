import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckforpassComponent } from './checkforpass.component';

describe('CheckforpassComponent', () => {
  let component: CheckforpassComponent;
  let fixture: ComponentFixture<CheckforpassComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckforpassComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckforpassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

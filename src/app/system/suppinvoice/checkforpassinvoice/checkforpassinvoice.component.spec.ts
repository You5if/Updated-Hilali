import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckforpassinvoiceComponent } from './checkforpassinvoice.component';

describe('CheckforpassinvoiceComponent', () => {
  let component: CheckforpassinvoiceComponent;
  let fixture: ComponentFixture<CheckforpassinvoiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckforpassinvoiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckforpassinvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

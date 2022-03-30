import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MovetobankComponent } from './movetobank.component';

describe('MovetobankComponent', () => {
  let component: MovetobankComponent;
  let fixture: ComponentFixture<MovetobankComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MovetobankComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovetobankComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

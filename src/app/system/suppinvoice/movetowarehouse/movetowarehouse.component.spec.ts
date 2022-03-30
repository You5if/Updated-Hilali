import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MovetowarehouseComponent } from './movetowarehouse.component';

describe('MovetowarehouseComponent', () => {
  let component: MovetowarehouseComponent;
  let fixture: ComponentFixture<MovetowarehouseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MovetowarehouseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovetowarehouseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CircuitDialogComponent } from './circuit-dialog.component';

describe('CircuitDialogComponent', () => {
  let component: CircuitDialogComponent;
  let fixture: ComponentFixture<CircuitDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CircuitDialogComponent]
    });
    fixture = TestBed.createComponent(CircuitDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

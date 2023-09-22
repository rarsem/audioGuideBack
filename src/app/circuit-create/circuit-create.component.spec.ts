import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CircuitCreateComponent } from './circuit-create.component';

describe('CircuitCreateComponent', () => {
  let component: CircuitCreateComponent;
  let fixture: ComponentFixture<CircuitCreateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CircuitCreateComponent]
    });
    fixture = TestBed.createComponent(CircuitCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

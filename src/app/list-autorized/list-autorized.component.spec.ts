import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAutorizedComponent } from './list-autorized.component';

describe('ListAutorizedComponent', () => {
  let component: ListAutorizedComponent;
  let fixture: ComponentFixture<ListAutorizedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListAutorizedComponent]
    });
    fixture = TestBed.createComponent(ListAutorizedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

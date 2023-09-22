import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapPopoverComponent } from './map-popover.component';

describe('MapPopoverComponent', () => {
  let component: MapPopoverComponent;
  let fixture: ComponentFixture<MapPopoverComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MapPopoverComponent]
    });
    fixture = TestBed.createComponent(MapPopoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

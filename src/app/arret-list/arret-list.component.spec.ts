import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArretListComponent } from './arret-list.component';

describe('ArretListComponent', () => {
  let component: ArretListComponent;
  let fixture: ComponentFixture<ArretListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ArretListComponent]
    });
    fixture = TestBed.createComponent(ArretListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

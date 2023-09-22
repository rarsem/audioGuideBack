import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArretCreateComponent } from './arret-create.component';

describe('ArretCreateComponent', () => {
  let component: ArretCreateComponent;
  let fixture: ComponentFixture<ArretCreateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ArretCreateComponent]
    });
    fixture = TestBed.createComponent(ArretCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

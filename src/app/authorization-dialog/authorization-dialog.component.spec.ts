import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorizationDialogComponent } from './authorization-dialog.component';

describe('AuthorizationDialogComponent', () => {
  let component: AuthorizationDialogComponent;
  let fixture: ComponentFixture<AuthorizationDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AuthorizationDialogComponent]
    });
    fixture = TestBed.createComponent(AuthorizationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

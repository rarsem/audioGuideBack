import { TestBed } from '@angular/core/testing';

import { ApiversionService } from './apiversion.service';

describe('ApiversionService', () => {
  let service: ApiversionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiversionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

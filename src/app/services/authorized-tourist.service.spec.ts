import { TestBed } from '@angular/core/testing';

import { AuthorizedTouristService } from './authorized-tourist.service';

describe('AuthorizedTouristService', () => {
  let service: AuthorizedTouristService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthorizedTouristService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { IsLoggedGuard } from './auth.guard';

describe('IsLoggedGuard', () => {
  let guard: IsLoggedGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(IsLoggedGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});

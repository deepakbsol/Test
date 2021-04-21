import { TestBed } from '@angular/core/testing';

import { RequiredUserDataGuard } from './required-user-data.guard';

describe('RequiredUserDataGuard', () => {
  let guard: RequiredUserDataGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(RequiredUserDataGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});

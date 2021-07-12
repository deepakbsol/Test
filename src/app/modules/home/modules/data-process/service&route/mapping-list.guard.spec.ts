import { TestBed } from '@angular/core/testing';

import { MappingListGuard } from './mapping-list.guard';

describe('MappingListGuard', () => {
  let guard: MappingListGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(MappingListGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});

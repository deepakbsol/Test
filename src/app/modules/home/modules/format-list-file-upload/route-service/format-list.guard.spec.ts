import { TestBed } from '@angular/core/testing';

import { FormatListGuard } from './format-list.guard';

describe('FormatListGuard', () => {
  let guard: FormatListGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(FormatListGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});

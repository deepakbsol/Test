import { TestBed } from '@angular/core/testing';

import { CoreDestTablesGuard } from './core-dest-tables.guard';

describe('CoreDestTablesGuard', () => {
  let guard: CoreDestTablesGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CoreDestTablesGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { UserCompanyRoleService } from './user-company-role.service';

describe('UserCompanyRoleService', () => {
  let service: UserCompanyRoleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserCompanyRoleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

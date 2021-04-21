import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCompanyRegistrationComponent } from './user-company-registration.component';

describe('UserCompanyRegistrationComponent', () => {
  let component: UserCompanyRegistrationComponent;
  let fixture: ComponentFixture<UserCompanyRegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserCompanyRegistrationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserCompanyRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

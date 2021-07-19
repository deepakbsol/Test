import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateReportingComponent } from './create-reporting.component';

describe('CreateReportingComponent', () => {
  let component: CreateReportingComponent;
  let fixture: ComponentFixture<CreateReportingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateReportingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateReportingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

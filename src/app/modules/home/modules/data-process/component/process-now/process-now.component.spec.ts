import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessNowComponent } from './process-now.component';

describe('ProcessNowComponent', () => {
  let component: ProcessNowComponent;
  let fixture: ComponentFixture<ProcessNowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProcessNowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcessNowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormatListUploadComponent } from './format-list-upload.component';

describe('FormatListUploadComponent', () => {
  let component: FormatListUploadComponent;
  let fixture: ComponentFixture<FormatListUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormatListUploadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormatListUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

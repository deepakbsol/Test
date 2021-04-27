import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormatListFileUploadComponent } from './format-list-file-upload.component';

describe('FormatListFileUploadComponent', () => {
  let component: FormatListFileUploadComponent;
  let fixture: ComponentFixture<FormatListFileUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormatListFileUploadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormatListFileUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileFormatUploadComponent } from './file-format-upload.component';

describe('FileFormatUploadComponent', () => {
  let component: FileFormatUploadComponent;
  let fixture: ComponentFixture<FileFormatUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FileFormatUploadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FileFormatUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

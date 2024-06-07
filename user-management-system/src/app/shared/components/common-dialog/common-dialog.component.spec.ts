import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonDialogComponent } from './common-dialog.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MaterialModule } from 'src/material.module';

describe('CommonDialogComponent', () => {
  let component: CommonDialogComponent;
  let fixture: ComponentFixture<CommonDialogComponent>;

  class MockDialogRef {
    close() {

    }
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CommonDialogComponent],
      imports: [MaterialModule],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: { title: 'Test Title', content: 'Test Content' } },
        { provide: MatDialogRef, useClass: MockDialogRef }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(CommonDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call onclick of okay', () => {
    component.onClickofOkay();
  })
});

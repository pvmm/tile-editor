import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PixelatedEditorComponent } from './pixelated-editor.component';

describe('PixelatedEditorComponent', () => {
  let component: PixelatedEditorComponent;
  let fixture: ComponentFixture<PixelatedEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PixelatedEditorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PixelatedEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

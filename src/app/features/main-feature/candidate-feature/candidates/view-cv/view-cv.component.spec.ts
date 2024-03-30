import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCVComponent } from './view-cv.component';

describe('ViewCVComponent', () => {
  let component: ViewCVComponent;
  let fixture: ComponentFixture<ViewCVComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewCVComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewCVComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
